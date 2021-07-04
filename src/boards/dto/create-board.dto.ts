import { CreateColumnsDto } from "./create-columns.dto";

export class CreateBoardDto {
    id: string;

    title: string;

    columns: Array<CreateColumnsDto>;
}
