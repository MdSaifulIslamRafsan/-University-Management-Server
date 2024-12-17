import { z } from 'zod';
const preRequisiteCoursesValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCoursesValidation).optional(),
    isDeleted : z.boolean().optional()
  }),
});

const updateCourseValidation = z.object({
    body: z.object({
      title: z.string().optional(),
      prefix: z.string().optional(),
      code: z.number().optional(),
      credits: z.number().optional(),
      preRequisiteCourses: z.array(preRequisiteCoursesValidation).optional(),
      isDeleted : z.boolean().optional()
    }),
  });
export const courseValidation = {
    createCourseValidation,
    updateCourseValidation
};
