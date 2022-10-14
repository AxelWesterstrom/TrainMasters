const mysql = require('mysql2');

module.exports = class DatabaseQueryer {
    static verbose = true;

    static connect() {
        this.dbConnection = mysql.createPool(
            require('./secrets/dbCredentials.json')
        );
    }

    static query(sql, params = []) {
        // call using await!
        this.dbConnection || this.connect();
        return new Promise((resolve, reject) => {
            this.verbose && this.log(sql, params);
            // let driverMethod = params.length ? 'execute' : 'query';
            let driverMethod = 'query'; // execute not adhering to parameters incorrect selects/search when method execute
            this.dbConnection[driverMethod](sql, params, (error, results) => {
                return error ? reject(error) : resolve(results);
            });
        });
    }

    static log(sql, params) {
        sql = sql.replace(/ {1,}/g, ' ');
        params ? console.log(sql, '? ->', params) : console.log(sql);
        console.log('\n' + '-'.repeat(60) + '\n');
    }
};
