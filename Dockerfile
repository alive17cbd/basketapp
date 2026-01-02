FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# Eliminar la config por defecto
RUN rm /etc/nginx/conf.d/default.conf
# Crear una nueva configuración que asegure los MIME types
RUN printf "server {\n\
    listen 80;\n\
    server_name localhost;\n\
    location / {\n\
    root /usr/share/nginx/html;\n\
    index index.html index.htm;\n\
    try_files \$uri \$uri/ /index.html;\n\
    include /etc/nginx/mime.types;\n\
    }\n\
    }\n" > /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
