# Use Node 18
FROM node:18-alpine

# Create and set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# IMPORTANT: Make sure server listens on 0.0.0.0, not just localhost

# Expose the port backend runs on
EXPOSE 5000

CMD ["npm", "start"]
