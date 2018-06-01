# use latest official node container
FROM node:apine
# define our directory varible so that we dont have to re-type it further down
ARG dir=/usr/src/gatewayservice
# install bash so we may run the wait-for-it shell script later
RUN apk add --update bash && rm -rf /var/cache/apk/*
# create app directory
RUN mkdir -p ${dir}
# moving to directory
WORKDIR ${dir}
# copy local package.json file to image
COPY package.json package.json
# install all npm dependencies
RUN npm install -y 
# copy contents of the repo to the app directory
COPY . ${dir}
# expose port 3000
EXPOSE 3000
# start the app
CMD ["./wait-for-it.sh", "mongoservice:27017", "--", "node", "server.js"]