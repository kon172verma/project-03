import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class AwsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Get the default VPC.
        const vpc = ec2.Vpc.fromLookup(this, 'MyDefaultVPC', {
            isDefault: true,
            vpcId: 'vpc-0e820cca6f50092db',
            vpcName: 'MyDefaultVPC',
            region: 'ap-south-1',
        });

        // Get the ECR repository.
        const ecrRepository = ecr.Repository.fromRepositoryName(this, 'ex12', 'ex12');

        // Create an S3 bucket.
        const s3Bucket = new s3.Bucket(this, 'ex12-bucket', {
            bucketName: 'ex12-bucket',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            encryption: s3.BucketEncryption.S3_MANAGED,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            versioned: true,
            enforceSSL: true,
        });

        // Create an IAM role.
        const ecsRole = new iam.Role(this, 'ex-12-ecs-role', {
            roleName: 'ex-12-ecs-role',
            assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
        });
        const s3PolicyDocument = new iam.PolicyDocument({
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:PutObject'],
                    resources: [s3Bucket.bucketArn + '/*'],
                }),
            ],
        });
        ecsRole.attachInlinePolicy(
            new iam.Policy(this, 'ecsPolicy', { document: s3PolicyDocument })
        );

        // Create a cluster.
        const cluster = new ecs.Cluster(this, 'ex-12-ecs-cluster', {
            clusterName: 'ex-12-ecs-cluster',
            vpc,
        });

        // Create a task definition.
        const taskDefinition = new ecs.TaskDefinition(this, 'ex-12-ecs-task-definition', {
            family: 'ex-12-ecs-task-definition',
            compatibility: ecs.Compatibility.FARGATE,
            memoryMiB: '3072',
            cpu: '1024',
            runtimePlatform: {
                operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
                cpuArchitecture: ecs.CpuArchitecture.ARM64,
            },
            taskRole: ecsRole,
        });

        // Add a container to the task definition.
        const container = taskDefinition.addContainer('ex-12-ecs-container', {
            containerName: 'ex-12-ecs-container',
            image: ecs.ContainerImage.fromEcrRepository(ecrRepository),
            memoryLimitMiB: 3072,
            cpu: 1024,
        });
        container.addPortMappings({
            containerPort: 8082,
            protocol: ecs.Protocol.TCP,
            appProtocol: ecs.AppProtocol.http,
            hostPort: 8082,
            name: '3000',
        });

        // Create a service.
        new ecs.FargateService(this, 'ex-12-ecs-service', {
            serviceName: 'ex-12-ecs-service',
            cluster,
            taskDefinition,
            assignPublicIp: true,
        });
    }
}
