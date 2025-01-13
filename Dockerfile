# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (using npm ci for a clean install)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Define the command to run the application
CMD ["npm", "start"]
