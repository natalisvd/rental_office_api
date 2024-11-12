import { Workspace } from './workplace.schema';
import { modelsVocabulary } from 'src/shared';

const { WORKPLACE_MODEL } = modelsVocabulary;

export const workplaceProviders = [
  {
    provide: WORKPLACE_MODEL,
    useFactory: () => Workspace,
    inject: ['DATABASE_CONNECTION'],
  },
];
