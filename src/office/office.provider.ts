import { Office } from './office.schema';
import { modelsVocabulary } from 'src/shared';

const { OFFICE_MODEL } = modelsVocabulary;

export const officeProviders = [
  {
    provide: OFFICE_MODEL,
    useFactory: () => Office,
    inject: ['DATABASE_CONNECTION'],
  },
];
