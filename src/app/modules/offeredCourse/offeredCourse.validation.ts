import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeStringValidation = z.string().refine((time) => {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/
    return regex.test(time);
},{
    message: 'Invalid time format. Expected HH:MM'
})


const createOfferedCourseValidation = z.object({
    body : z.object({
        semesterRegistration : z.string(),
        academicFaculty : z.string(),
        academicDepartment : z.string(),
        course : z.string(),
        faculty : z.string(),
        maxCapacity : z.number(),
        days : z.array(z.enum([...Days] as [string, ...string[]])),
        startTime : timeStringValidation,
        endTime : timeStringValidation,
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
    },{
        message: 'Start time must be before end time'
    })
});

const updateOfferedCourseValidation = z.object({
    body : z.object({
        faculty : z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime : timeStringValidation,
        endTime : timeStringValidation,
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
    },{
        message: 'Start time must be before end time'
    })
});

export const OfferedCourseValidation = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation
}