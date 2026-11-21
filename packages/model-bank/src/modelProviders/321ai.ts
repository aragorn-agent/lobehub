import type { ModelProviderCard } from '../types';

// ref: https://321ai.cc/api/pricing
const Provider321ai: ModelProviderCard = {
  apiKeyUrl: 'https://321ai.cc',
  chatModels: [],
  checkModel: 'gpt-4o',
  description:
    '321AI is an AI API marketplace: one API key connects to multiple upstream channels, automatically routing the same model to the lowest-priced working channel; failed calls are not billed.',
  id: '321ai',
  modelList: { showModelFetcher: true },
  modelsUrl: 'https://321ai.cc/api/pricing',
  name: '321AI',
  settings: {
    proxyUrl: {
      placeholder: 'https://321ai.cc/v1',
    },
    sdkType: 'openai',
    showModelFetcher: true,
  },
  url: 'https://321ai.cc',
};

export default Provider321ai;
