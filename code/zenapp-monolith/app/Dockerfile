FROM node:latest

# set working directory
RUN mkdir /src
WORKDIR /src

# install app dependencies
ADD package.json /src/package.json
ADD . /src/app
RUN npm install
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait src/wait
RUN chmod +x src/wait

# start app
CMD src/wait && npm start

EXPOSE 80