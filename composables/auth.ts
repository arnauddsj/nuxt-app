import * as bcrypt from 'bcrypt'
import { PasswordType, ISecuredPassword } from '~/types/auth'

export const useGenPassword = async (input: PasswordType): Promise<ISecuredPassword> => {
  const saltRounds = 10
  const salt: string = await bcrypt.genSalt(saltRounds)
  const hash: string = await bcrypt.hash(input, salt)

  return {
    salt,
    hash
  }
}

export const useVerifyPassword = async (
  input: PasswordType,
  storedPassword: ISecuredPassword
): Promise<boolean> => {
  const passwordMatches: boolean = await bcrypt.compare(
    input,
    storedPassword.hash
  )

  return passwordMatches
}
