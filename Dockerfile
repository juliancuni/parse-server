FROM node:16

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install

ENV APP_ID ${PARSE_SERVER_APPLICATION_ID}
ENV MASTER_KEY ${PARSE_SERVER_MASTER_KEY}
ENV DATABASE_URI ${PARSE_SERVER_DATABASE_URI}

# Optional (default : 'parse/cloud/main.js')
# ENV CLOUD_CODE_MAIN cloudCodePath

# Optional (default : '/parse')
# ENV PARSE_MOUNT mountPath

EXPOSE 1337

# Uncomment if you want to access cloud code outside of your container
# A main.js file must be present, if not Parse will not start

# VOLUME /parse/cloud               

CMD [ "npm", "start" ]
