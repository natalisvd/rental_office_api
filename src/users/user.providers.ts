import { Mongoose } from 'mongoose';
import { UserSchema } from './user.schema';
import { modelsVocabulary } from 'src/shared';

const { USER_MODEL } = modelsVocabulary;

export const userProviders = [
  {
    provide: USER_MODEL,
    useFactory: (mongoose: Mongoose) => mongoose.model('Users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
