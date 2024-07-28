import { z } from 'zod';
import { messages } from '@/config/messages';

export const realLocationSchema = z.object({
  type: z.string(),
  address: z
    .string()
    .min(1, { message: messages.mainLocationIsRequired })
    .optional(),
  name: z
    .string()
    .min(1, { message: messages.locationNameIsRequired })
    .optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

export type RealLocationSchema = z.infer<typeof realLocationSchema>;

// Step 1
export const formStep1Schema = z.object({
  first_name: z.string().min(1, messages.firstNameRequired),
  last_name: z.string().min(1, messages.lastNameRequired),
  email: z
    .string()
    .min(1, { message: messages.emailIsRequired })
    .email({ message: messages.invalidEmail }),
  phone: z
    .string({
      required_error: messages.phoneNumberIsRequired,
    })
    .min(2, { message: messages.phoneNumberIsRequired }),
});

export type FormStep1Schema = z.infer<typeof formStep1Schema>;

// step 2
export const locationSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: messages.locationNameIsRequired }),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

export type LocationSchema = z.infer<typeof locationSchema>;

export const formStep2Schema = z.object({
  name: z.string().min(1, messages.companyNameIsRequired),
  industry_id: z.number().min(1, messages.industryIsRequired),
  main_location: z.string().min(1, messages.mainLocationIsRequired),
  secondary_location: z.string().optional(),
  add_locations: z.array(locationSchema).optional(),
  total_employees: z.number().min(1, messages.totalEmployeesIsRequired),
  data_locations: z.array(locationSchema).optional(),
  public_cloud_provider: z
    .number()
    .array()
    .min(1, messages.publicCloudProviderIsRequired),
});

export type FormStep2Schema = z.infer<typeof formStep2Schema>;

// step 3

export const departSchema = z.object({
  name: z.string().min(1, 'Please enter the department name.'),
  selected: z.boolean(),
});

export type DepartSchema = z.infer<typeof departSchema>;

export const formStep3Schema = z.object({
  departments: z.string().array().min(1, messages.departmentsAreRequired),
  all_departments: z.array(departSchema).optional(),
});

export type FormStep3Schema = z.infer<typeof formStep3Schema>;

// step 4

export const departDetailSchema = z.object({
  name: z.string(),
  locations: z.number().array().min(1, messages.departmentLocationIsRequired),
  total_teammembers: z.number().min(1, messages.totalTeamMembersIsRequired),
});

export type DepartDetailSchema = z.infer<typeof departDetailSchema>;

export const formStep4Schema = z.object({
  departments_details: z.array(departDetailSchema).optional(),
});

export type FormStep4Schema = z.infer<typeof formStep4Schema>;

// step 5
export const vendorSchema = z.object({
  name: z.string(),
  logo: z.string(),
});

export const productSchema = z.object({
  id: z.number(),
  vendor: vendorSchema,
  category: z.string(),
  description: z.string().min(1, messages.descriptionIsRequired),
  name: z.string(),
  isActive: z.boolean(),
  department: z.number().array(),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const formStep5Schema = z.object({
  products: z.array(productSchema).optional(),
});

export type FormStep5Schema = z.infer<typeof formStep5Schema>;
