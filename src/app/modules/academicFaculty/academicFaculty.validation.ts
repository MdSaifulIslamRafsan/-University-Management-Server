import { z } from 'zod';

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty name must be a string',
    }),
  }),
});

const updateAcademicFacultyValidation = z.object({
    body : z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty name must be a string',
        }).optional()
    })
})

export const AcademicFacultyValidation = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation
};
