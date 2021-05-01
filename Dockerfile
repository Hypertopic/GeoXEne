FROM node:lts
COPY . /GeoXEne
WORKDIR /GeoXEne
RUN npm install

ENTRYPOINT ["npm","start"]
