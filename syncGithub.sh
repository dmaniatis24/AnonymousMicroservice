#!/bin/bash
container_name="anonimes-email"

exec > logfile.log 2>&1
echo 'Start Auto Deploy'

docker stop "$container_name"
docker rm "$container_name"
docker volume prune -f
docker image prune -f -a

echo "Create Container again"
docker compose -f docker-compose.yml up --build -d


container_name="anonimes-nas"

exec > logfile.log 2>&1
echo 'Start Auto Deploy'

docker stop "$container_name"
docker rm "$container_name"
docker volume prune -f
docker image prune -f -a

echo "Create Container again"
docker compose -f docker-compose.yml up --build -d