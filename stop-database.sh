#!/bin/bash

name="postgres-db"
existing_container=$(docker ps -a | awk '{print $NF}' | grep "${name}")
if [[ $existing_container = "$name" ]]; then
    echo "Stopping container ${name}..."
    docker rm -f "${name}" > /dev/null 2>&1 || { echoError "Couldn't terminate container ${name}."; exit 1; }
    echo "Container ${name} stopped"
fi    

