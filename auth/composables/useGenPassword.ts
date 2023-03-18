import crypto from 'crypto'
import { PasswordType, ISecuredPassword } from '~/types/auth'

const useGenPassword = (input: PasswordType): ISecuredPassword => {
  const salt: string = crypto.randomBytes(32).toString('hex')
  const hash: string = crypto
    .pbkdf2Sync(input, salt, 10000, 64, 'sha512')
    .toString('hex')

  return {
    salt,
    hash
  }
}

export default useGenPassword
