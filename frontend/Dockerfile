FROM node:alpine

WORKDIR /frontend

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]