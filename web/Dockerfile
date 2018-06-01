# use latest official node image
FROM node:alpine
# define our directory varible so that we dont have to re-type it further down
ARG dir=/usr/src/webservice
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
# expose port 3002
EXPOSE 3002
# start the app
CMD ["node", "server.js"]

