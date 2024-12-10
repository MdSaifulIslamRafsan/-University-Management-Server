import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

 const createStudentValidationSchema = z.object({
  body : z.object({
    password: z.string().max(20),
    student : z.object({
    name: userNameSchema,
    admissionSemester : z.string(),
    academicDepartment : z.string(),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImgUrl: z.string(),
    })
  })
 });

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: userNameSchema.partial(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroups: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: guardianSchema.partial(),
        localGuardian: localGuardianSchema.partial(),
        profileImgUrl: z.string().optional(),
      })
      .partial(),
  }),
});


export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
}

