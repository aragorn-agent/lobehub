import { ModelProvider } from 'model-bank';

import type { OpenAICompatibleFactoryOptions } from '../../core/openaiCompatible';
import { createOpenAICompatibleRuntime } from '../../core/openaiCompatible';
import type { ChatCompletionErrorPayload } from '../../types';
import { AgentRuntimeErrorType } from '../../types/error';
import { processMultiProviderModelList } from '../../utils/modelParse';

export interface Provider321aiModelCard {
  id: string;
}

export const params = {
  baseURL: 'https://321ai.cc/v1',
  chatCompletion: {
    handleError: (error: any): Omit<ChatCompletionErrorPayload, 'provider'> | undefined => {
      let errorResponse: Response | undefined;
      if (error instanceof Response) {
        errorResponse = error;
      } else if ('status' in (error as any)) {
        errorResponse = error as Response;
      }
      if (errorResponse && errorResponse.status === 401) {
        return {
          error: errorResponse.status,
          errorType: AgentRuntimeErrorType.InvalidProviderAPIKey,
        };
      }
      return {
        error,
      };
    },
  },
  debug: {
    chatCompletion: () => process.env.DEBUG_321AI_CHAT_COMPLETION === '1',
  },
  errorType: {
    bizError: AgentRuntimeErrorType.ProviderBizError,
    invalidAPIKey: AgentRuntimeErrorType.InvalidProviderAPIKey,
  },
  models: async ({ client }) => {
    const modelsPage = (await client.models.list()) as any;
    const modelList: Provider321aiModelCard[] = modelsPage.data;
    return processMultiProviderModelList(modelList, '321ai');
  },
  provider: ModelProvider.Provider321ai,
} satisfies OpenAICompatibleFactoryOptions;

export const Lobe321AI = createOpenAICompatibleRuntime(params);
