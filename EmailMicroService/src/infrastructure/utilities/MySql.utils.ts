class MySqlUtils {
    // generateWhereStatement(query: any, textSearchCol = 'name', dateSearchCol = 'createdAt'): string[] | any[] {
    //     let where = []
    //     let values = []
    //     for (let key in query) {
    //         let value = query[key]
    //         if (key === 'search') {
    //             where.push(`(${textSearchCol} LIKE ?)`)
    //             values.push(`%${value}%`)
    //         } else if (key === 'startDate') {
    //             where.push(`${dateSearchCol} >= ?`)
    //             values.push(value)
    //         } else if (key === 'endDate') {
    //             where.push(`${dateSearchCol} <= ?`)
    //             values.push(value)
    //         } else if (Array.isArray(value)) {
    //             let placeholders = value.map((v) => '?').join(', ')
    //             where.push(`${key} IN (${placeholders})`)
    //             values.push(...value)
    //         } else {
    //             where.push(`${key} = ?`)
    //             values.push(value)
    //         }
    //     }
    //
    //     // logger.debug({ msg: this.constructor.name, data: where.join(' AND '), values: values })
    //     return [where.join(' AND '), values]
    // }

    formatDateFromDb(date: any) {
        return Date.parse(date)
    }

    formatDateToDb(date: string | any) {
        let year = date.getUTCFullYear()
        let month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
        let day = date.getUTCDate().toString().padStart(2, '0')
        let hours = date.getUTCHours().toString().padStart(2, '0')
        let minutes = date.getUTCMinutes().toString().padStart(2, '0')
        let seconds = date.getUTCSeconds().toString().padStart(2, '0')
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }

    generateWhereStatement(filters: any, whereAnd = true) {
        const filtersGeneratorOr = ['userId', 'username']
        let where: any = []
        let values: any = []

        let filterArr: string[] = []

        if (typeof filters.filters === 'string' && filters.filters.includes('&')) {
            filterArr = filters.filters.split('&')
        } else if (typeof filters.filters === 'string') {
            filterArr.push(filters.filters)
        } else if (Array.isArray(filters.filters)) {
            filterArr = filters.filters
        }

        if (filters.filters) {
            for (const filter of filterArr) {
                const parts = filter.split('=')
                if (parts.length === 2) {
                    const col = parts[0]
                    const val = parts[1]
                    where.push(`(${col} = ?)`)
                    values.push(val)
                }
            }
        } else {
            //For Patch Entities
            for (let key in filters) {
                let value = filters[key]
                where.push(`${key} = ?`)
                values.push(value)
            }
        }

        if (filters.search) {
            filtersGeneratorOr.forEach((filter) => {
                where.push(`(${filter} LIKE ?)`)
                values.push(`%${filters.search}%`)
            })
        }

        if (whereAnd) {
            return [where.join(' AND '), values]
        } else {
            return [where.join(' OR '), values]
        }
    }

    extractInsertPreparedStatements(object: string | any): string | any {
        const columns = Object.keys(object)
        const questionMarks = columns.map((c) => '?')
        const values = columns
            .map((c) => object[c])
            .map((v) => {
                if (v instanceof Date) {
                    return this.formatDateToDb(v)
                } else {
                    return v
                }
            })
        return [columns.join(','), questionMarks.join(','), values]
    }

    extractUpdatePreparedStatements(object: string | any) {
        const columns = Object.keys(object)
        const colsWithQs = columns.map((c) => `${c} = ?`)
        const values = columns
            .map((c) => object[c])
            .map((v) => {
                if (v instanceof Date) {
                    return this.formatDateToDb(v)
                } else {
                    return v
                }
            })
        return [colsWithQs.join(','), values]
    }
}

export default MySqlUtils
