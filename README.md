# auditing-service

# Description

This is an audit logging package which logs all the crud operations performed in a database collection in MongoDB. Essentially, all the crud operations
performed are stored in a separate collection consisting of the following fields:

```
dbName
ipAddress
operation
documentID
dataBefore
dataAfter
outcome
time
```

# 🔥 Getting Started

1. Install this package using "npm install auditing-service".
2. Import the package in your code.

```javascript
const auditingService = require("auditing-service");
```

3. Initialize the package by invoking "initAudit" function. By default, a collection named "audit_trails" will be created in a database named "auditDB".

```javascript
auditingService.initAudit(YOUR_MONGO_URI);
// Eg - auditingService.initAudit(mongodb+srv://username:password@something_here.mongodb.net/);

// OR

auditingService.initAudit(YOUR_MONGO_URI, YOUR_DB_NAME, YOUR_COLLECTION_NAME);
// Eg - auditingService.initAudit(mongodb+srv://username:password@something_here.mongodb.net/, "abcDB", "myAuditTrails");
```

# ⚡ Usage

## (a) CREATE

### _Success Scenario_

```javascript
// Function prototype
auditingService.createAudit(oldData, newData, outcome);

// Example
auditingService.createAudit(
  null,
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  "success"
);
```

For a success scenario, before create operation is performed, oldData is null. If the operation is successful, the newData should not be null and outcome
is "success".

### _Failure Scenario_

```javascript
// Function prototype
auditingService.createAudit(oldData, newData, outcome);

// Example
auditingService.createAudit(null, null, "failure");
```

For a failure scenario, before create operation is performed, oldData is null. If the operation fails, the newData should be null and outcome
is "failure".

## (b) READ

### _Success Scenario_

```javascript
// Function prototype
auditingService.reeadAudit(oldData, newData, outcome);

// Example
auditingService.readAudit(
  [
    {
      name: "John",
      age: 21,
      school: "ABC",
    },
    {
      name: "Bill",
      age: 31,
      school: "CDF",
    },
  ],
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  "success"
);
```

For a success scenario, before read operation is performed, oldData is not null. If the operation is successful, the newData should not be null as well and outcome is "success". The oldData/newData can be a single object or an array of objects.

### _Failure Scenario_

```javascript
// Function prototype
auditingService.readAudit(oldData, newData, outcome);

// Example
auditingService.readAudit(
  [
    {
      name: "John",
      age: 21,
      school: "ABC",
    },
    {
      name: "Bill",
      age: 31,
      school: "CDF",
    },
  ],
  null,
  "failure"
);
```

For a failure scenario, before read operation is performed, oldData is not null. If the operation fails, the newData should be null and outcome is "failure". The oldData can be a single object or an array of objects.

## (c) UPDATE

### _Success Scenario_

```javascript
// Function prototype
auditingService.updateAudit(oldData, newData, outcome);

// Example
auditingService.updateAudit(
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  {
    name: "Bill",
    age: 31,
    school: "CDF",
  },
  "success"
);
```

For a success scenario, before update operation is performed, oldData is not null. If the operation succeeds, the newData should not be null as well and outcome is "success".

### _Failure Scenario_

```javascript
// Function prototype
auditingService.updateAudit(oldData, newData, outcome);

// Example
auditingService.updateAudit(
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  "failure"
);
```

For a failure scenario, before update operation is performed, oldData is not null. If the operation succeeds, the newData should be equal to oldData and outcome is "failure".

## (d) DELETE

### _Success Scenario_

```javascript
// Function prototype
auditingService.deleteAudit(oldData, newData, outcome);

// Example
auditingService.deleteAudit(
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  null,
  "success"
);
```

For a success scenario, before delete operation is performed, oldData is not null. If the operation succeeds, the newData should be null and outcome is "success".

### _Failure Scenario_

```javascript
// Function prototype
auditingService.deleteAudit(oldData, newData, outcome);

// Example
auditingService.deleteAudit(
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  {
    name: "John",
    age: 21,
    school: "ABC",
  },
  "failure"
);
```

For a failure scenario, before delete operation is performed, oldData is not null. If the operation fails, the newData should be equal to oldData and outcome is "failure".
