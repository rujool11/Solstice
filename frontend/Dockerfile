# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for the frontend
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the development port
EXPOSE 5713

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5713"]
