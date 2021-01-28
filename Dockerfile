FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN apk add --no-cache python3 alpine-sdk
RUN npm install --only=dev --ignore-scripts
RUN npm rebuild --verbose sharp

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["npm", "start"]