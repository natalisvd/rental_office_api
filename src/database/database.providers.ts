import * as mongoose from 'mongoose';
import { config } from 'src/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(`mongodb://${config.HOST}/rental-office`),
  },
];
