import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Role } from './roles.model';

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
