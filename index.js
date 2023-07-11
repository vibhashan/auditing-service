let dbNameGlobal;
let ipAddressVal = require("ip");
const mongoose = require("mongoose");
let AuditTrail;

// Function to initialize the audit-logging collection
function initAudit(mongoURI, dbName = "auditDB", collectionName = "audit_trails") {
    dbNameGlobal = dbName;

    AuditTrail = mongoose.model(collectionName, require("./schemas/auditSchema"));

    mongoose.connect(`${mongoURI}${dbName}`).then(
        console.log(`Successfully created '${collectionName}' collection in '${dbName}' database`)
    ).catch(err =>
        console.log(err)
    );
}


// Function to insert an audit log document for create operation
async function createAudit(oldData, newData, outcome) {
    try {
        const log = new AuditTrail({
            dbName: dbNameGlobal,
            ipAddress: ipAddressVal.address(),
            operation: "create",
            documentID: (newData === null) ? "" : newData._id,
            dataBefore: oldData,
            dataAfter: newData,
            outcome: (outcome === "success") ? "success" : "failure"
        });

        // Insert a document
        await log.save();

    } catch (err) {
        console.log(err);
    }
}

// Function to insert an audit log document for read operation
async function readAudit(oldData, newData, outcome) {
    try {
        const log = new AuditTrail({
            dbName: dbNameGlobal,
            ipAddress: ipAddressVal.address(),
            operation: "read",
            documentID: oldData._id,
            dataBefore: oldData,
            dataAfter: newData,
            outcome: (outcome === "success") ? "success" : "failure"
        });

        // Insert a document
        await log.save();

    } catch (err) {
        console.log(err);
    }
}


// Function to insert an audit log document for update operation
async function updateAudit(oldData, newData, outcome) {
    try {
        const log = new AuditTrail({
            dbName: dbNameGlobal,
            ipAddress: ipAddressVal.address(),
            operation: "update",
            documentID: newData._id,
            dataBefore: oldData,
            dataAfter: newData,
            outcome: (outcome === "success") ? "success" : "failure"
        });

        // Insert a document
        await log.save();

    } catch (err) {
        console.log(err);
    }
}

// Function to insert an audit log document for update operation
async function deleteAudit(oldData, newData, outcome) {
    try {
        const log = new AuditTrail({
            dbName: dbNameGlobal,
            ipAddress: ipAddressVal.address(),
            operation: "delete",
            documentID: oldData._id,
            dataBefore: oldData,
            dataAfter: newData,
            outcome: (outcome === "success") ? "success" : "failure"
        });

        // Insert a document
        await log.save();

    } catch (err) {
        console.log(err);
    }
}

// Export all the functions
module.exports = {
    initAudit,
    createAudit,
    readAudit,
    updateAudit,
    deleteAudit
}


