FROM node:18.13.0-alpine as builder
#FROM node:18.13.0-alpine
#RUN apk add --no-cache chromium
#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser 
COPY . /app
WORKDIR /app
RUN npm install
#RUN npm run lint
#RUN npm run test
#RUN npm install -g @angular/cli
RUN npm run build

FROM nginx:1.17.10-alpine
#EXPOSE 80

# Remove default Nginx configuration
#RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/
# Set the working directory
#WORKDIR /usr/share/nginx/html
#COPY /app/dist/watson /usr/share/nginx/html 
# Remove default Nginx files
#RUN rm -rf ./*
COPY --from=builder /app/dist/watson usr/share/nginx/html
#COPY --from=builder /app/dist/watson .
# Create an empty favicon.ico file
#RUN touch favicon.ico

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
#CMD ["nginx", "-g", "daemon off;"]
