#!/bin/bash

name="postgres-db"
existing_container=$(docker ps -a | awk '{print $NF}' | grep "${name}")
if [[ $existing_container = "$name" ]]; then
    echo "A container with the name ${name} found, removing it..."
    docker rm -f "${name}" > /dev/null 2>&1 || { echoError "Couldn't terminate container ${name}."; exit 1; }
fi    

echo "Starting ${name}..."
docker run -p 5432:5432 --name ${name} -e POSTGRES_DB=todos -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d postgres 
