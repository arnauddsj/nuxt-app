import crypto from 'crypto'
import { PasswordType, ISecuredPassword } from '~/types/auth'

const useVerifyPassword = (input: PasswordType, storedPassword: ISecuredPassword): boolean => {
  const hash = crypto.pbkdf2Sync(input, storedPassword.salt, 10000, 64, 'sha512').toString('hex')
  const passwordMatches : boolean = hash === storedPassword.hash

  return passwordMatches
}

export default useVerifyPassword
