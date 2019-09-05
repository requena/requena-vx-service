const COLLECITON_NAME = "tarifa";
let mongodb;

function getAllTarifa(callback) {
    mongodb.connect((err, db) => {
        db.collection(COLLECITON_NAME).find().toArray(callback);
    })
}

function getTarifaByDdd(ddd, callback) {
    mongodb.connect((err, db) => {
        db.collection(COLLECITON_NAME).findOne({
            _id: require("mongodb").Long(ddd)
        }, callback);
    });
}

function saveTarifa(tarifa, callback) {
    mongodb.connect((err, db) => {
        db.collection(COLLECITON_NAME).save(tarifa, callback);
    });
}

function disconnect() {
    return mongodb.disconnect();
}

function connect(mongo) {
    mongodb = mongo;
}


function createCollection(callback){
    mongodb.connect((err, db) => {
        db.createCollection(COLLECITON_NAME, callback);
    });
}

module.exports = {
    getAllTarifa,
    getTarifaByDdd,
    saveTarifa,
    disconnect,
    connect,
    createCollection
}