const { collection } = require("firebase/firestore");

let CONSTANTS = {

    TABLES: {

        MASTER: `permissions_master`,
        USER_MAPPING: 'user_mapping',
    },
    collection:{
        idpass:'password & id',
    }

}

module.exports = Object.freeze(CONSTANTS);