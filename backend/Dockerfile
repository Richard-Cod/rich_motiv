FROM node
WORKDIR /app
COPY package.json ./package.json
# RUN apk add --no-cache make gcc g++ python && \
#     npm install && \
#     npm rebuild bcrypt --build-from-source && \
#     apk del make gcc g++ python
RUN npm install
COPY . .
EXPOSE 4000
# USER node   
CMD ["node", "index.js"] 

# docker build --tag richmotiv-api:latest .
# docker run --name richmotiv-api -p 4500:4000 richmotiv-api:latest

#docker rm boring-api
#docker rmi boring-api
#docker rm $(docker ps -aq)
#docker rmi $(docker images -aq)

#docker rm $(docker ps -aq) && docker rmi $(docker images -aq)