import { z } from "zod";
import { Days } from "./OfferedCourse.constant";


const createOfferedCourseValidation = z.object({
    body : z.object({
        semesterRegistration : z.string(),
        academicSemester : z.string(),
        academicFaculty : z.string(),
        academicDepartment : z.string(),
        course : z.string(),
        faculty : z.string(),
        maxCapacity : z.number(),
        days : z.enum([...Days] as [string, ...string[]]),
        startTime : z.string(),
        endTime : z.string(),
    })
});

const updateOfferedCourseValidation = z.object({
    body : z.object({
        faculty : z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.enum([...Days] as [string, ...string[]]),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    })
});

export const OfferedCourseValidation = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation
}