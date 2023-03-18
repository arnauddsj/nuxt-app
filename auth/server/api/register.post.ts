import { User } from '@prisma/client'
import useGenPassword from '~/auth/composables/useGenPassword'
import { PasswordType, passwordSchema, ISecuredPassword, emailSchema, EmailType } from '~/types/auth'

// Depending on the app, remove Partial from User Type and maybe create a separate interface for the response instead of using User from prisma
export default defineEventHandler(async (event): Promise<Partial<User>> => {
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

  // Hash and salt password are optional in case of social login
  const genPassword : Partial<ISecuredPassword> = useGenPassword(password)

  const user = await event.context.prisma.user.create({
    data: {
      email,
      // use the spread operator to include hash and salt only if they are present
      ...genPassword
    },
    select: {
      id: true,
      email: true
    }
  })

  return user
})
