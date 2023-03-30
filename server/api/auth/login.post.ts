// This is an example of a local password authentication strategy, it's not implemented in the app
import { User, PasswordType, passwordSchema, emailSchema, EmailType } from '~/types/auth'
import { useVerifyPassword } from '~/composables/auth'

export default defineEventHandler(async (event): Promise<User> => {
  const body = await readBody(event)
  const password : PasswordType = body.password
  const email : EmailType = body.email

  const parsePassword = passwordSchema.safeParse(password)
  const parseEmail = emailSchema.safeParse(email)

  if (!parsePassword.success) {
    throw createError({
      statusCode: 500,
      message: parsePassword.error.message
    })
  }

  if (!parseEmail.success) {
    throw createError({
      statusCode: 500,
      message: parseEmail.error.message
    })
  }

  // get password from db
  const getUser = await event.context.prisma.user.findUnique({
    where: {
      email
    },
    // Select infer the type of getUser and infer it can be null
    select: {
      id: true,
      email: true,
      hash: true,
      salt: true
    }
  })

  // check if there is a user found to make sure it's not null
  if (!getUser || !getUser.hash || !getUser.salt) {
    throw createError({
      statusCode: 500,
      message: 'User not found'
    })
  }

  const isPasswordMatch : boolean = await useVerifyPassword(password, {
    hash: getUser.hash,
    salt: getUser.salt
  })

  if (!isPasswordMatch) {
    throw createError({
      statusCode: 500,
      message: 'The password or email is incorrect'
    })
  }

  return {
    id: getUser.id,
    email: getUser.email
  }
})
