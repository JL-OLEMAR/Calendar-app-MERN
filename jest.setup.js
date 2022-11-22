import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.test.local' })

jest.mock('./src/helpers/getEnvVariables.js', () => ({
  getEnvVariables: () => ({ ...process.env })
}))
