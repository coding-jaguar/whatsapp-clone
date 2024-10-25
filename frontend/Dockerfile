# client/Dockerfile

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies using npm ci for faster, deterministic builds
RUN npm ci --silent

# Now copy the rest of the application files
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev"]
