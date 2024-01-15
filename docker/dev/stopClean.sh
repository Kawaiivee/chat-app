# stop containers
docker stop chat-app-web
docker stop chat-app-server

# remove containers
docker rm note-taker-frontend
docker rm chat-app-web

# remove images
docker image rm chat-app-web:latest
docker image rm chat-app-server:latest