import { z } from "zod";
import { UserStatus } from "./user.constant";


const userSchemaValidation = z.object({
    password : z.string({
        invalid_type_error: "Name must be a string",
    }).max(20, {message : 'password more than 20 characters'}).optional(),

})

const changeStatusValidation = z.object({
    body: z.object({
        status: z.enum([...UserStatus as [string, ...string[]]]),
    })
})

export const userValidation ={
     userSchemaValidation,
     changeStatusValidation

}