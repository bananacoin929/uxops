import { z } from 'zod';
import { validateEmail, validatePassword } from './common-rules';

// form zod validation schema
export const forgetPasswordSchema = z.object({
  email: validateEmail,
});

export const resetPasswordSchema = z.object({
  password: validatePassword,
});

// generate form types from zod validation schema
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
