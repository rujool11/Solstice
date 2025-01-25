# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for the backend
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
