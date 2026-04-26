# Use a stable Node.js LTS version
FROM node:20

# Install subversion as some legacy Steam dependencies require it
RUN apt-get update && apt-get install -y subversion && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# Note: We use --omit=dev for production
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure necessary directories exist
RUN mkdir -p cache log temp

# Expose the port (should match config.json)
EXPOSE 80

# Start the server
CMD [ "node", "server.js" ]
