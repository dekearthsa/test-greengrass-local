# Use the official Node.js image
FROM node:18-alpine

# Create and change to the app directory
WORKDIR /usr/src

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY . .
VOLUME ["/usr/src/certs"]

CMD [ "node", "index.js" ]