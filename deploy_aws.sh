echo 'Starting to Deploy...'
# ssh -i "richmotivec2key.pem" ubuntu@ec2-3-14-245-244.us-east-2.compute.amazonaws.com " sudo apt-get update
#         sudo apt-get install \
#     apt-transport-https \
#     ca-certificates \
#     curl \
#     gnupg-agent \
#     software-properties-common
#     curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#     sudo apt-key fingerprint 0EBFCD88"

#ssh -i "richmotivec2key.pem" ubuntu@ec2-3-14-245-244.us-east-2.compute.amazonaws.com "
ssh ubuntu@ip-172-31-12-50 "
sudo docker image prune -f
        cd rich_motiv 
        git pull
        sudo docker-compose down
        echo 'You are doing well'
        sudo docker-compose build && sudo docker-compose up -d"

echo 'Deployment completed successfully'
exit