// This is an example of a local password authentication strategy, it's not implemented in the app

import { z } from 'zod'

export const emailSchema = z.string({ required_error: 'Email is required' }).email({ message: 'Email must be a valid email address' })

export type EmailType = z.infer<typeof emailSchema>

export interface User {
  id: string,
  email: EmailType,
  lastLogin: Date | null,
}
