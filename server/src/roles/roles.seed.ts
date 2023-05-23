import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'Role',
  unique: ['name'],
})
export class RolesSeed implements OnSeederInit {
  run() {
    return [
      {
        name: 'Администратор',
      },
      {
        name: 'Секретарь',
      },
      {
        name: 'Деканат',
      },
    ];
  }
}
