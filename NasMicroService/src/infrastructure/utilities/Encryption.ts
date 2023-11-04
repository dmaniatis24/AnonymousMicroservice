import bcrypt from 'bcrypt'

class Encryption {
      saltRounds: number

      constructor(saltRounds = 12) {
            this.saltRounds = saltRounds
      }

      // Hash a plain text password
      async hashPassword(plainTextPassword: string) {
            try {
                  const hash = await bcrypt.hash(plainTextPassword, this.saltRounds)
                  return hash
            } catch (error) {
                  throw new Error('Password hashing failed')
            }
      }

      // Verify a password against a hashed password
      async verifyPassword(plainTextPassword: any, hashedPassword: any) {
            try {
                  return await bcrypt.compare(plainTextPassword, hashedPassword)
            } catch (error) {
                  throw new Error('Password verification failed')
            }
      }
}

export default Encryption
