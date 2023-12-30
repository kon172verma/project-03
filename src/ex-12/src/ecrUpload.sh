aws ecr get-login-password --region ap-south-1 --profile private | docker login --username AWS --password-stdin 433034682644.dkr.ecr.ap-south-1.amazonaws.com;
docker build -t ex12 .;
docker tag ex12:latest 433034682644.dkr.ecr.ap-south-1.amazonaws.com/ex12:latest;
docker push 433034682644.dkr.ecr.ap-south-1.amazonaws.com/ex12:latest;