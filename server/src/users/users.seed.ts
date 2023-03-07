import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

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
}
