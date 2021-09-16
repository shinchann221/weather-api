FROM node:slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node index.js
LABEL org.opencontainers.image.source="https://github.com/Neem-Tree-Agro-Solutions/weather-api"
EXPOSE 5002
