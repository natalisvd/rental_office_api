import { Workspace } from './workspace.schema';
import { modelsVocabulary } from 'src/shared';

const { WORKSPACE_MODEL } = modelsVocabulary;

export const workspaceProviders = [
  {
    provide: WORKSPACE_MODEL,
    useFactory: () => Workspace,
    inject: ['DATABASE_CONNECTION'],
  },
];
