FROM node:14.17.5-alpine3.11 as build
WORKDIR /app
COPY ["package.json","package-lock.json","/app/"]
RUN npm install
COPY . /app

RUN npm run build -- --outputPath=./dist/out --configuration
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]

