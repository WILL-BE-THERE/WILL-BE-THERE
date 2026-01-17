# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port imports
EXPOSE 5173

# Run the app in development mode
# Host 0.0.0.0 is required for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
