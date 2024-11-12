import { Purchase } from './purchase.schema';
import { modelsVocabulary } from 'src/shared';

const { PURCHASE_MODEL } = modelsVocabulary;

export const purchaseProviders = [
  {
    provide: PURCHASE_MODEL,
    useFactory: () => Purchase,
    inject: ['DATABASE_CONNECTION'],
  },
];
