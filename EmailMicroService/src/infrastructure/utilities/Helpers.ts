class Helpers {
    generateCurrentDate() {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1 // Months are zero-indexed
        const currentDay = currentDate.getDate()
        const newDate = `${currentYear}${currentMonth}${currentDay}`
        return newDate
    }

    generateRandomNumber() {
        const randomNumber = Math.floor(Math.random() * (1000 - 99 + 1) + 999)
        return randomNumber
    }

    generateRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let randomString = ''

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            randomString += characters.charAt(randomIndex)
        }

        return randomString
    }

    async mergeAssociativeArrays(mainArr: any, assocArr: any, keys: any) {
        const results: any[] = mainArr.res.map((mainArr: any) => {
            const assocArray = assocArr.res.filter((newArr: any) => newArr[`${keys.mainKey}`] === mainArr[`${keys.mainKey}`])
            // Add department information to the user object
            return {
                ...mainArr,
                [`${keys.assocNameForArray}`]: assocArray.map((newArr: any) => {
                    return {
                        [`${keys.assocKey}`]: newArr[`${keys.assocKey}`],
                        [`${keys.assocNameAssocKey}`]: newArr[`${keys.assocNameKey}`]
                    }
                })
            }
        })

        return { res: results }
    }
}

export default Helpers
