import { TransformFnParams } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export const StringToBooleanTransformer = ({
  value,
  key,
}: TransformFnParams) => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
  throw new BadRequestException(`Expected ${key} to be a boolean (true/fale)`);
};
