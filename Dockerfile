# Dockerfile
# Use Node.js image
FROM node:22-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build it
COPY . .
RUN npm run build

# Use a lightweight web server for the app
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app ./
ENV NODE_ENV production
EXPOSE 8080
CMD ["sh", "-c", "PORT=8080 npm run start"]
