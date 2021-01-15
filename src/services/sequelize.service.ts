import { injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import config from '../config';

@injectable()
export class SequelizeService {
  public get() {
    return new Sequelize({
      database: config.bdName,
      define: {
        timestamps: false
      },
      dialect: 'postgres',
      host: config.bdHost,
      models: [`${__dirname}/models/sequelize`],
      password: config.bdPass,
      username: config.bdUserName
    });
  }
}
