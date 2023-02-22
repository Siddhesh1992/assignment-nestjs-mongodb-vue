FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

# RUN npm run build
# CMD ["node", "dist/main.js"]

EXPOSE 3000
CMD ["npm", "run", "start:dev"]