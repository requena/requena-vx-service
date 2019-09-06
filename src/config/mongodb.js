/* JS que mantém a conexão com o banco de dados aberta.
Deve ser mantida apenas uma instancia por Server inicializado */
const MongoClient = require("mongodb").MongoClient;
var connection = null;
var db = null;

function connect(callback) {
    if (connection) return callback(null, db);

    MongoClient.connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(conn => {
        connection = conn;
        db = conn.db(process.env.DATABASE_NAME);
        return callback(null, db);
    }).catch(err => {
        return callback(err, null);
    })
}

function disconnect() {
    if (!connection) return true;
    connection.close();
    connection = null;
    return true;
}

module.exports = {
    connect,
    disconnect
}