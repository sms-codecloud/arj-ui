# # Produces large image size 
# FROM node:25-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "run", "start"]

# Multi stage build to reduce image size
FROM node:25-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:latest as deployer

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

# To run the image locally, use the command:
# docker build -t my-react-app-multistage-image .
# docker run -it -p  3000:80 --name my-react-app-multistage-container my-react-app-multistage-image
