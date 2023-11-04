import jwt from 'jsonwebtoken'

class Token {
    private secret: any

    constructor() {
        this.secret = process.env.APP_SECRET
    }

    async generateToken(payload: any) {
        try {
            const options = {
                expiresIn: '3h' // Token expiration time (e.g., 1 hour)
            }

            const tokenData = { data: payload }

            const token = jwt.sign(tokenData, this.secret, options)
            return token
        } catch (myE: any) {
            console.log('generateToken:::', myE)
        }
    }

    async decodeToken(token: any) {
        try {
            const decoded = jwt.decode(token, this.secret)
            return decoded
        } catch (err) {
            return false // Token is invalid or has expired
        }
    }

    async validateToken(token: string) {
        try {
            const decoded = jwt.verify(token, this.secret)
            return decoded
        } catch (err) {
            console.log('validateToken error:::', err)
            return false // Token is invalid or has expired
        }
    }
}

export default Token
