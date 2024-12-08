import { z } from "zod";

const createAcademicDepartmentValidation = z.object({
    body : z.object({
        name: z.string({
            invalid_type_error : "academic department name must be string type",
            required_error : "academic department name is required"
        }),
        academicFaculty : z.string({
            invalid_type_error : "academic faculty must be string type",
            required_error : "academic faculty is required"
        })
    })
})
const updateAcademicDepartmentValidation = z.object({
    body : z.object({
        name: z.string({
            invalid_type_error : "academic department name must be string type"
        }).optional(),
        academicFaculty : z.string({
            invalid_type_error : "academic faculty must be string type"
        }).optional()
    })
})
export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation
}