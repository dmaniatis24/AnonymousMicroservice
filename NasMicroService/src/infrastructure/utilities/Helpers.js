"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
    generateCurrentDate() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
        const currentDay = currentDate.getDate();
        const newDate = `${currentYear}${currentMonth}${currentDay}`;
        return newDate;
    }
    generateRandomNumber() {
        const randomNumber = Math.floor(Math.random() * (1000 - 99 + 1) + 999);
        return randomNumber;
    }
    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }
    async mergeAssociativeArrays(mainArr, assocArr, keys) {
        const results = mainArr.res.map((mainArr) => {
            const assocArray = assocArr.res.filter((newArr) => newArr[`${keys.mainKey}`] === mainArr[`${keys.mainKey}`]);
            // Add department information to the user object
            return Object.assign(Object.assign({}, mainArr), { [`${keys.assocNameForArray}`]: assocArray.map((newArr) => {
                    return {
                        [`${keys.assocKey}`]: newArr[`${keys.assocKey}`],
                        [`${keys.assocNameAssocKey}`]: newArr[`${keys.assocNameKey}`]
                    };
                }) });
        });
        return { res: results };
    }
}
exports.default = Helpers;
