FROM mongo:latest

ENV MONGO_INITDB_DATABASE database
COPY  ./mongo_data /dataseed/
COPY  ./init.sh /docker-entrypoint-initdb.d/init.sh

VOLUME ["/data/db"]

EXPOSE 27017