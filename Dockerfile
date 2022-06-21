FROM node:14-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
# --only=prod for prod install
RUN npm install 
COPY . .
EXPOSE 3002
CMD [ "npm", "run", "dev" ]
