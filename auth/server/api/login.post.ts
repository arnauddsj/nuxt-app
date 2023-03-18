import useVerifyPassword from '~/auth/composables/useVerifyPassword'
import { PasswordType, passwordSchema } from '~/types/auth'

export default defineEventHandler(async (event): Promise<boolean> => {
  const body = await readBody(event)
  const password : PasswordType = body.password
  const parseSchema = passwordSchema.safeParse(password)

  if (!parseSchema.success) {
    throw createError({
      statusCode: 500,
      message: parseSchema.error.message
    })
  }

  // get password from db
  const storedPassword = {
    salt: '5cef54f9c76627dbef071829c18872eb2a54aeeb3a6f7478150e9db31a39b656',
    hash: '76c3065e149e5e4bc9beb1e9ec1408de8d77a44c854192a01d4fc96472ca6154f8d2ee9d2c8dfb570865483734a47851fca3fa1dc5dad7ab9b87cecc1bf7f1b9'
  }

  const isPasswordMatch : boolean = useVerifyPassword(password, storedPassword)

  return isPasswordMatch
})
