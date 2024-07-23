import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

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
  company_name: z.string().min(1, messages.companyNameIsRequired),
  industry: z.string().nonempty({ message: messages.industryIsRequired }),
  main_location: z.string().min(1, messages.mainLocationIsRequired),
  secondary_location: z.string().optional(),
  add_locations: z.array(locationSchema).optional(),
  total_employees: z.number().min(1, messages.totalEmployeesIsRequired),
  data_locations: z.array(locationSchema).optional(),
  public_cloud_provider: z
    .string()
    .array()
    .min(1, messages.publicCloudProviderIsRequired),
});

export type FormStep2Schema = z.infer<typeof formStep2Schema>;

// step 3

export const departSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Please enter the department name.'),
  selected: z.boolean(),
});

export type DepartSchema = z.infer<typeof departSchema>;

export const formStep3Schema = z.object({
  departments: z.string().array().min(1, messages.departmentsAreRequired),
  all_departments: z.array(departSchema).optional(),
});

// step 4

export const detailLocationSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const departDetailSchema = z.object({
  name: z.string(),
  locations: z
    .array(detailLocationSchema)
    .min(1, messages.departmentLocationIsRequired),
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
  department: z.string().array(),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const formStep5Schema = z.object({
  products: z.array(productSchema).optional(),
});

export type FormStep5Schema = z.infer<typeof formStep5Schema>;

/////////////////////////////

export type FormStep3Schema = z.infer<typeof formStep3Schema>;

export const propertyTypeSchema = z.object({
  propertyType: z.string().min(1, messages.propertyTypeIsRequired),
});

// generate form types from zod validation schema
export type PropertyTypeSchema = z.infer<typeof propertyTypeSchema>;

// step 3
export const placeTypeSchema = z.object({
  placeType: z.string().min(1, messages.placeTypeIsRequired),
});

export type PlaceTypeSchema = z.infer<typeof placeTypeSchema>;

// step 4
// export const locationSchema = z.object({
//   address: z.string().optional(),
//   lat: z.number().optional(),
//   lng: z.number().optional(),
// });

// export type LocationSchema = z.infer<typeof locationSchema>;

// step 5
// export const formStep5Schema = z.object({
//   guests: z.number().positive(),
//   bedrooms: z.number().positive().optional(),
//   beds: z.number().positive().optional(),
//   guestType: z.string().min(1, messages.thisFieldIsRequired),
//   bedroomLock: z.string().min(1, messages.thisFieldIsRequired),
// });

// export type FormStep5Schema = z.infer<typeof formStep5Schema>;

// step 6
export const formStep6Schema = z.object({
  indoorAmenities: z.string().array().min(1, messages.amenitiesAreRequired),
  outdoorAmenities: z.string().array().optional(),
});

export type FormStep6Schema = z.infer<typeof formStep6Schema>;

// step 7
export const formStep7Schema = z.object({
  propertyName: z.string().min(1, messages.propertyNameIsRequired),
  propertyDescription: z.string().optional(),
  priceRange: z.number().array().optional(),
  photos: z.array(fileSchema).optional(),
});

export type FormStep7Schema = z.infer<typeof formStep7Schema>;
