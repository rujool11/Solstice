# Use Node 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose the Vite dev server port (default 5173)
EXPOSE 5173

# Start Vite with host binding to allow external access
CMD ["npm", "run", "dev", "--", "--host"]
