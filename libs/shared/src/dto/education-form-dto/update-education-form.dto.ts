import { PartialType } from "@nestjs/swagger";
import { CreateEducationFormDto } from "./create-education-form.dto";

export class UpdateEducationFormDto extends PartialType(CreateEducationFormDto) {}