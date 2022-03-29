FROM node:16
WORKDIR /api
EXPOSE 8081
COPY ["package.json", "./"]
RUN npm install --legacy-peer-deps 
RUN npm audit fix
COPY . .

CMD ["npm", "start"]