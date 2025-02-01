# Use official Node.js image as a base
FROM mcr.microsoft.com/playwright:v1.34.0-focal

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies (Playwright + other dependencies)
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose the port (if your tests need an HTTP server or other services)
# EXPOSE 8080

# Command to run the tests (replace with your test script command)
CMD ["npm", "test"]
