# use latest official node container
FROM node
# define our directory varible so that we dont have to re-type it further down
ARG dir=/usr/src/sparkservice
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
# expose port 3001 because this is the one we used for express
EXPOSE 3001
# start the app
CMD ["node", "app.js"]

