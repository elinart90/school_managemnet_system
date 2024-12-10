const mongoose = require('mongoose')

const tenantConnections = {};

const getTenantConnection = async(tenantId, dbUri) => {
    if(!tenantConnections[tenantId]) {
        tenantConnections[tenantId] = mongoose.createConnection(dbUri)
        console.log(`Created new connection for tenant: ${tenantId}`)
    }
    
    return tenantConnections[tenantId]
}

module.exports = getTenantConnection