import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions():
    | SequelizeModuleOptions
    | Promise<SequelizeModuleOptions> {
    return {
      dialect: 'postgres',
      username: this.configService.get('DB.USERNAME'),
      password: this.configService.get('DB.PASSWORD'),
      database: this.configService.get('DB.DATABASE'),
      host: this.configService.get('DB.HOST'),
      port: +this.configService.get('DB.PORT'),
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      define: {
        timestamps: false,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    };
  }
}
