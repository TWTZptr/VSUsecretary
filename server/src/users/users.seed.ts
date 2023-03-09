import { More, OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { genSalt, genSaltSync, hash, hashSync } from 'bcrypt';
import { NUMBER_OF_PASSWORD_SALT_ROUNDS } from '../password/constants';

@Seeder({
  model: 'User',
  unique: ['name'],
})
export class UsersSeed implements OnSeederInit {
  run() {
    return [
      {
        name: 'Администратор',
        password: 'password',
        roleId: 1,
      },
      {
        name: 'Секретарь',
        password: 'password',
        roleId: 2,
      },
      {
        name: 'Деканат',
        password: 'password',
        roleId: 3,
      },
    ];
  }

  everyone(item: More, index: number): More {
    const salt = genSaltSync(NUMBER_OF_PASSWORD_SALT_ROUNDS);
    item.password = hashSync(item.password, salt);
    return item;
  }
}
