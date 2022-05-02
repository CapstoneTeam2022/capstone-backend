import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class LabResultDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    FilledDate: string;

    @IsNotEmpty()
    @IsString()
    FilledBy: string;

    @IsNotEmpty()
    @IsString()
    result: string;

    @IsNotEmpty()
    @IsString()
    measuredIn: string;

    @IsNotEmpty()
    @IsInt()
    normalRangeFrom: number;

    @IsNotEmpty()
    @IsInt()
    normalRangeTo: number;

    @IsNotEmpty()
    @IsBoolean()
    isAbnormal: boolean;

    @IsNotEmpty()
    @IsString()
    comment: string;

    // @OneToOne(() => InvestigationRequest, (invReq) => invReq.labResult)
    // investigationRequest: InvestigationRequest;

    // @OneToOne(() => User, (user) => user.labReult)
    // user: User;
}