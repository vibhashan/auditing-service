const mongoose = require("mongoose");

const auditSchema = mongoose.Schema({
    dbName: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    documentID: {
        type: String
    },
    dataBefore: {
        type: Array
    },
    dataAfter: {
        type: Array
    },
    outcome: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = auditSchema;