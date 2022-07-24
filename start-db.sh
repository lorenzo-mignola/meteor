#!/bin/bash

docker-compose down
docker-compose up -d

docker exec -it mongodb mongosh --eval "rs.initiate({
  _id: \"replicaSet\",
  members: [
    {_id: 0, host: \"mongodb:27017\"}
  ]
})"