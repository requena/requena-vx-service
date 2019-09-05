const COLLECITON_NAME = "plano";
let mongodb;

function getAllPlano(callback) {
    mongodb.connect((err, db) => {
        db.collection(COLLECITON_NAME).find().toArray(callback);
    })
}

function getPlanoById(id, callback) {
    mongodb.connect((err, db) => {
        db.collection(COLLECITON_NAME).findOne({
            _id: id
        }, callback);
    });
}

function savePlano(plano, callback) {
    mongodb.connect((err, db) => {
        db.collection(COLLECITON_NAME).save(plano, callback);
    });
}

function connect(mongo) {
    mongodb = mongo;
}

function disconnect() {
    return mongodb.disconnect();
}

function createCollection(callback){
    mongodb.connect((err, db) => {
        db.createCollection(COLLECITON_NAME, callback);
    });
}

module.exports = {
    getAllPlano,
    getPlanoById,
    savePlano,
    disconnect,
    connect,
    createCollection
}