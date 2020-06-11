echo "------------------------ Stop containers ------------------------"
docker stop $(docker ps -q)
echo "------------------------ Remove containers ------------------------"
docker rm $(docker ps -qa)
echo "------------------------ Remove volume ------------------------"
docker volume rm trwipbackend_static
echo "------------------------ Start containers ------------------------"
docker-compose -f docker-compose.production.yml up --build -d
