import { TransformFnParams } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export const StringToNumberTransformer = ({
  value,
  key,
}: TransformFnParams) => {
  const isNumeric = !isNaN(value);
  if (isNumeric) return Number(value);
  throw new BadRequestException(`Expected ${key} to be a Number`);
};
