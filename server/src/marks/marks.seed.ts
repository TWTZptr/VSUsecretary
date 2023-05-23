import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'Mark',
  unique: ['mark'],
})
export class MarksSeed implements OnSeederInit {
  run() {
    return [
      {
        mark: 2,
        name: 'Неудовлетворительно',
      },
      {
        mark: 3,
        name: 'Удовлетворительно',
      },
      {
        mark: 4,
        name: 'Хорошо',
      },
      {
        mark: 5,
        name: 'Отлично',
      },
    ];
  }
}
