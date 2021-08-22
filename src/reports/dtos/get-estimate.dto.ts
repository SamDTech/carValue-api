import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;


  @Transform((params) => +params.value)
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform((params) => +params.value)
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;


  @Transform((params) => parseFloat( params.value))
  @IsLongitude()
  lng: number;


  @Transform((params) => parseFloat(params.value) )
  @IsLatitude()
  lat: number;
}