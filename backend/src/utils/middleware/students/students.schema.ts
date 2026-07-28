import { z } from 'zod';

export const createStudentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().datetime({ offset: true }).or(z.date()),
  gender: z.string(),
  currentClassSectionId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  admissionNumber: z.string().optional(), // auto-generate if missing
});
