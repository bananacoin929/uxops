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
export const formStep2Schema = z.object({
  company_name: z.string().min(1, messages.companyNameIsRequired),
  industry: z.string({ required_error: messages.industryIsRequired }),
  main_location: z.string().min(1, messages.mainLocationIsRequired),
  secondary_location: z.string().optional(),
  // situation: z.string().min(1, messages.situationIsRequired),
});

export type FormStep2Schema = z.infer<typeof formStep2Schema>;

// step 3

export const departSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.string(),
  selected: z.boolean(),
});

export type DepartSchema = z.infer<typeof departSchema>;

export const formStep3Schema = z.object({
  departments: z.string().array().min(1, messages.departmentsAreRequired),
  all_departments: z.array(departSchema).optional(),
});

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
export const locationSchema = z.object({
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export type LocationSchema = z.infer<typeof locationSchema>;

// step 5
export const formStep5Schema = z.object({
  guests: z.number().positive(),
  bedrooms: z.number().positive().optional(),
  beds: z.number().positive().optional(),
  guestType: z.string().min(1, messages.thisFieldIsRequired),
  bedroomLock: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep5Schema = z.infer<typeof formStep5Schema>;

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
