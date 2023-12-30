import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { REGION, BUCKET } from './config';
import { logger } from '../../lib/logger';

const client = new S3Client({ region: REGION });

export const uploadFile = async (body: string) => {
    const timestamp: number = Math.floor(new Date().getTime() / 1000);
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: timestamp.toString() + '.txt',
        Body: body,
    });
    try {
        const response = await client.send(command);
        logger.info(
            response.$metadata.httpStatusCode === 200
                ? 'File uploaded successfully'
                : 'File upload failed'
        );
    } catch (err) {
        console.error(err);
    }
};
