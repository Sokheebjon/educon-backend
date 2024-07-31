import { ApplicationStatus } from "@edufin-back/student-prisma-client"
import { AcademicSubjectEntity } from "../../entities/academic-subject.entity"

export class GetTestsByRegistration {
    testSubjectAndCount:{
        subject:AcademicSubjectEntity,
        count:number
    }[]
    registration_id:string
    status:ApplicationStatus
}