"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySql_utils_1 = __importDefault(require("../../infrastructure/utilities/MySql.utils"));
const Helpers_1 = __importDefault(require("../../infrastructure/utilities/Helpers"));
class UsersRepository {
    constructor(props) {
        this.mysql = props.mysql;
        this.logger = props.logger;
        this.table = 'user';
        this.departmentsUserAssoc = 'departments_user_assoc';
        this.departments = 'departments';
        this.keys = {
            mainKey: 'userId',
            assocNameForArray: 'departments',
            assocKey: 'departmentId',
            assocNameAssocKey: 'departmentName',
            assocNameKey: 'department'
        };
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }
    async retrieveAll() {
        try {
            const resultsUser = await this.mysql.query(`SELECT * FROM ${this.table}`);
            const resultsDepartmentUserAssoc = await this.mysql.query(`SELECT * FROM ${this.departmentsUserAssoc} inner join ${this.departments} on ${this.departmentsUserAssoc}.departmentId = ${this.departments}.departmentId`);
            const hel = new Helpers_1.default();
            return {
                users: await hel.mergeAssociativeArrays(resultsUser, resultsDepartmentUserAssoc, this.keys)
            };
        }
        catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error });
            return {
                error: error
            };
        }
    }
    async retrieveWithFilter(filters, whereAnd = true) {
        try {
            this.logger.debug({ msg: this.constructor.name + ' Filters', data: filters });
            const whereGen = new MySql_utils_1.default();
            const [where, values] = whereGen.generateWhereStatement(filters, whereAnd);
            console.log('whereStatment::' + where);
            const resultsUser = await this.mysql.query(`SELECT * FROM ${this.table} WHERE ${where}`, values);
            const resultsDepartmentUserAssoc = await this.mysql.query(`SELECT * FROM ${this.departmentsUserAssoc} inner join ${this.departments} on ${this.departmentsUserAssoc}.departmentId = ${this.departments}.departmentId`);
            const hel = new Helpers_1.default();
            return {
                users: await hel.mergeAssociativeArrays(resultsUser, resultsDepartmentUserAssoc, this.keys)
            };
        }
        catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error });
            return {
                error: error
            };
        }
    }
    async insert(payload) {
        try {
            const insertGen = new MySql_utils_1.default();
            const [cols, qMarks, values] = insertGen.extractInsertPreparedStatements(payload);
            const result = await this.mysql.query(`INSERT INTO ${this.table} (${cols}) VALUES (${qMarks})`, values);
            return {
                createdEntityId: result
            };
        }
        catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error });
            return {
                error: error
            };
        }
    }
    async update({ filters, attrs }) {
        try {
            attrs['updatedAt'] = new Date();
            const mysqlUtils = new MySql_utils_1.default();
            const [where, filterValues] = mysqlUtils.generateWhereStatement(filters);
            const [colsWithQs, updateValues] = mysqlUtils.extractUpdatePreparedStatements(attrs);
            const result = await this.mysql.query(`UPDATE ${this.table} SET ${colsWithQs} WHERE ${where} AND deletedAt IS NULL`, updateValues.concat(filterValues));
            return {
                id: filterValues,
                updatedEntities: result
            };
        }
        catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error });
            return {
                error: error
            };
        }
    }
    async restore({ filters, attrs }) {
        try {
            attrs['updatedAt'] = new Date();
            const mysqlUtils = new MySql_utils_1.default();
            const [where, filterValues] = mysqlUtils.generateWhereStatement(filters);
            const [colsWithQs, updateValues] = mysqlUtils.extractUpdatePreparedStatements(attrs);
            const result = await this.mysql.query(`UPDATE ${this.table} SET ${colsWithQs} WHERE ${where} `, updateValues.concat(filterValues));
            return {
                id: filterValues,
                updatedEntities: result
            };
        }
        catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error });
            return {
                error: error
            };
        }
    }
}
exports.default = UsersRepository;
