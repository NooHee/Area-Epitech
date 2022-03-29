FROM node:16
WORKDIR /server
COPY ["package.json", "./"]
EXPOSE 8080
RUN npm install --legacy-peer-deps
#RUN npm audit fix
COPY . .
CMD ["npm", "start"]
