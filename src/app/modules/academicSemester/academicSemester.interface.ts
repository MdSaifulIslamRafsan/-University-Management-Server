
export type MonthType = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
   


export interface academicSemesterType {
    name : "Autumn" | "Summer" | "Fall",
    code : "01" | "02" | "03",
    year : Date,
    startMonth : MonthType,
    endMonth : MonthType

}