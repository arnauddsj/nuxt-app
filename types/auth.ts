// This is an example of a local password authentication strategy, it's not implemented in the app

import { z } from 'zod'

export const emailSchema = z.string({ required_error: 'Email is required' }).email({ message: 'Email must be a valid email address' })
export const passwordSchema = z.string({ required_error: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }).max(100)

export type EmailType = z.infer<typeof emailSchema>
export type PasswordType = z.infer<typeof passwordSchema>

export interface ISecuredPassword {
  salt: string,
  hash: string
}

export interface User {
  id: string,
  email: EmailType,
  lastLogin: Date | null,
}
