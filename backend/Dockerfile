# server/Dockerfile

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies using npm ci for faster, deterministic builds
RUN npm ci --silent

# Copy Prisma schema (if you have it)
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Now copy the rest of the source code
COPY . .

# Expose the port your Express app runs on
EXPOSE 5000

# Start the Express server
CMD ["npm", "run", "dev"]
