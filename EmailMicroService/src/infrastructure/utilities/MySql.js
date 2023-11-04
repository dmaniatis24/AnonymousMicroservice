"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const Logger_1 = __importDefault(require("./Logger"));
class MySqlApp {
    constructor(props) {
        const { logger, options } = props;
        this.logger = logger.child({}, { msgPrefix: '[MYSQL] ' });
        this.options = options;
        this.pool = mysql2_1.default.createPool({
            connectionLimit: this.options.connectionLimit,
            host: this.options.host,
            user: this.options.user,
            password: this.options.password,
            database: this.options.database,
            port: this.options.port
        });
        //logger.debug({ info: 'MySqlApp Constructor', data: this.options })
    }
    // formatDateFromDb(date: any) {
    //     return Date.parse(date)
    // }
    checkIfDate(date) {
        try {
            const check = !isNaN(date.getTime());
            return true;
        }
        catch (myE) {
            return false;
        }
    }
    formatDateFromDb(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        // console.log(date)
        // console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    async checkConnection(query) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, (err, results) => {
                if (err)
                    return reject(err);
                this.logger.trace(`Query ${JSON.stringify({
                    query: query.replace(/(\r\n|\n|\r)/gm, ''),
                    results
                }, null, 2)}`);
                Object.keys(results).forEach((key) => {
                    if (this.checkIfDate(results[key])) {
                        results[key] = this.formatDateFromDb(results[key]);
                    }
                });
                return resolve(results);
            });
        });
    }
    async query(query, values = []) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                Logger_1.default.debug({ msg: 'MySql Query Results', query: query, values: values, data: results.length });
                //ToDo: Change Date from Server
                return resolve({ res: results, count: results.length });
            });
        });
    }
}
exports.default = MySqlApp;
