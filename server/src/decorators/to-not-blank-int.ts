import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

const ToOptionalInt = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    },
  );

  const toClass = (target: any, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToInt(obj[key], key);
      },
      {
        toClassOnly: true,
      },
    )(target, key);
  };

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};

const valueToInt = (value: any, key: string) => {
  if (value === '') {
    throw new BadRequestException([`Emplty value on key '${key}'`]);
  }

  return +value;
};

export { ToOptionalInt };
