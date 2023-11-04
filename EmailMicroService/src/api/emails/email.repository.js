"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailsRepository {
    constructor(props) {
        this.mysql = props.mysql;
        this.logger = props.logger;
        this.table = 'report';
        this.reportDepartmentsAssoc = 'report_departments_assoc';
        this.departments = 'departments';
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }
}
exports.default = EmailsRepository;
