import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'EducationLevel',
  unique: ['name'],
})
export class EducationLevelsSeed implements OnSeederInit {
  run() {
    return [
      {
        name: 'Бакалавриат',
      },
      {
        name: 'Магистратура',
      },
      {
        name: 'Специалитет',
      },
    ];
  }
}
