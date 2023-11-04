FROM node:19-alpine

# Create app directory
WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Global cross-env
RUN npm install -g cross-env

# Install dependencies
RUN npm install --save
RUN npm install

# Copy the rest of the application code
COPY . .

# Build App
RUN npm run build

# Use a different directory for the node_modules
ENV NODE_MODULES_CACHE=/usr/src/cache/node_modules
RUN mkdir -p $NODE_MODULES_CACHE

# Use the cache for the node_modules
RUN ln -s $NODE_MODULES_CACHE node_modules

# Start the app
CMD [ "npm", "start" ]