import Token from '../../infrastructure/utilities/Token'

class UploadService {
      private repository: any
      private logger: any

      constructor({ repository }: any) {
            this.repository = repository
            this.logger = repository.logger
            // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
      }

      async upload(username: string, password: string) {}
}

export default UploadService
