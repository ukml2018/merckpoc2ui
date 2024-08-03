FROM node:18.13.0-alpine as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
FROM nginx:1.17.10-alpine
COPY --from=builder /app/dist/watson/browser usr/share/nginx/html
EXPOSE 80
