#!/bin/sh

mongoimport -v --db database --collection usermodels --type json --file dataseed/initUser.json --jsonArray &&
mongoimport -v --db database --collection thirdpartyservicemodels --type json --file dataseed/thirdpartyservices.json --jsonArray

