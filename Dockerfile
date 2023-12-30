FROM node:18-alpine
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8082
CMD ["npm", "start"]
