# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install the app's dependencies
RUN npm install

# Make the app's port available to the outside world
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start-server"]
