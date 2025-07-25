import { HookObject } from '../middlewares/hooks/types';

/**
 * Settings for retrying requests.
 * @interface
 */
export interface RetrySettings {
  /** The maximum number of retry attempts. */
  attempts: number;
  /** The HTTP status codes on which to retry. */
  onStatusCodes: number[];
  /** Whether to use the provider's retry wait. */
  useRetryAfterHeader?: boolean;
}

export interface CacheSettings {
  mode: string;
  maxAge?: number;
}

export enum StrategyModes {
  LOADBALANCE = 'loadbalance',
  FALLBACK = 'fallback',
  SINGLE = 'single',
  CONDITIONAL = 'conditional',
}

interface Strategy {
  mode: StrategyModes;
  onStatusCodes?: Array<number>;
  conditions?: {
    query: {
      [key: string]: any;
    };
    then: string;
  }[];
  default?: string;
}

/**
 * Configuration for an AI provider.
 * @interface
 */
export interface Options {
  /** The name of the provider. */
  provider: string | undefined;
  /** The name of the API key for the provider. */
  virtualKey?: string;
  /** The API key for the provider. */
  apiKey?: string;
  /** The weight of the provider, used for load balancing. */
  weight?: number;
  /** The retry settings for the provider. */
  retry?: RetrySettings;
  /** The parameters to override in the request. */
  overrideParams?: Params;
  /** The actual url used to make llm calls */
  urlToFetch?: string;
  /** Azure specific */
  resourceName?: string;
  deploymentId?: string;
  apiVersion?: string;
  adAuth?: string;
  azureAuthMode?: string;
  azureManagedClientId?: string;
  azureEntraClientId?: string;
  azureEntraClientSecret?: string;
  azureEntraTenantId?: string;
  azureAdToken?: string;
  azureModelName?: string;
  /** Workers AI specific */
  workersAiAccountId?: string;
  /** The parameter to set custom base url */
  customHost?: string;
  /** The parameter to set list of headers to be forwarded as-is to the provider */
  forwardHeaders?: string[];
  /** provider option index picked based on weight in loadbalance mode */
  index?: number;
  cache?: CacheSettings | string;
  metadata?: Record<string, string>;
  requestTimeout?: number;
  /** This is used to determine if the request should be transformed to formData Example: Stability V2 */
  transformToFormData?: boolean;
  /** AWS specific (used for Bedrock and Sagemaker) */
  awsSecretAccessKey?: string;
  awsAccessKeyId?: string;
  awsSessionToken?: string;
  awsRegion?: string;
  awsAuthType?: string;
  awsRoleArn?: string;
  awsExternalId?: string;
  awsS3Bucket?: string;
  awsS3ObjectKey?: string;
  awsBedrockModel?: string;
  awsServerSideEncryption?: string;
  awsServerSideEncryptionKMSKeyId?: string;

  /** Sagemaker specific */
  amznSagemakerCustomAttributes?: string;
  amznSagemakerTargetModel?: string;
  amznSagemakerTargetVariant?: string;
  amznSagemakerTargetContainerHostname?: string;
  amznSagemakerInferenceId?: string;
  amznSagemakerEnableExplanations?: string;
  amznSagemakerInferenceComponent?: string;
  amznSagemakerSessionId?: string;
  amznSagemakerModelName?: string;

  /** Stability AI specific */
  stabilityClientId?: string;
  stabilityClientUserId?: string;
  stabilityClientVersion?: string;

  /** Hugging Face specific */
  huggingfaceBaseUrl?: string;

  /** Google Vertex AI specific */
  vertexRegion?: string;
  vertexProjectId?: string;
  vertexServiceAccountJson?: Record<string, any>;
  vertexStorageBucketName?: string;
  vertexModelName?: string;

  // Required for file uploads with google.
  filename?: string;

  afterRequestHooks?: HookObject[];
  beforeRequestHooks?: HookObject[];
  defaultInputGuardrails?: HookObject[];
  defaultOutputGuardrails?: HookObject[];

  /** OpenAI specific */
  openaiProject?: string;
  openaiOrganization?: string;
  openaiBeta?: string;

  /** Azure Inference Specific */
  azureDeploymentName?: string;
  azureApiVersion?: string;
  azureExtraParams?: string;
  azureFoundryUrl?: string;

  /** The parameter to determine if extra non-openai compliant fields should be returned in response */
  strictOpenAiCompliance?: boolean;
  /** Parameter to determine if fim/completions endpoint is to be used */
  mistralFimCompletion?: String;
  /** Anthropic specific headers */
  anthropicBeta?: string;
  anthropicVersion?: string;

  /** Fireworks finetune required fields */
  fireworksAccountId?: string;

  /** Cortex specific fields */
  snowflakeAccount?: string;
}

/**
 * Configuration for an AI provider.
 * @interface
 */
export interface Targets {
  name?: string;
  strategy?: Strategy;
  /** The name of the provider. */
  provider?: string | undefined;
  /** The name of the API key for the provider. */
  virtualKey?: string;
  /** The API key for the provider. */
  apiKey?: string;
  /** The weight of the provider, used for load balancing. */
  weight?: number;
  /** The retry settings for the provider. */
  retry?: RetrySettings;
  /** The parameters to override in the request. */
  overrideParams?: Params;
  /** The actual url used to make llm calls */
  urlToFetch?: string;
  /** Azure specific */
  resourceName?: string;
  deploymentId?: string;
  apiVersion?: string;
  adAuth?: string;
  azureAuthMode?: string;
  azureManagedClientId?: string;
  azureEntraClientId?: string;
  azureEntraClientSecret?: string;
  azureEntraTenantId?: string;
  azureModelName?: string;
  /** provider option index picked based on weight in loadbalance mode */
  index?: number;
  cache?: CacheSettings | string;
  targets?: Targets[];

  /** This is used to determine if the request should be transformed to formData Example: Stability V2 */
  transformToFormData?: boolean;

  defaultInputGuardrails?: HookObject[];
  defaultOutputGuardrails?: HookObject[];
  originalIndex?: number;
}

/**
 * Configuration for handling the request.
 * @interface
 */
export interface Config {
  /** The mode for handling the request. It can be "single", "fallback", "loadbalance", or "scientist". */
  mode: 'single' | 'fallback' | 'loadbalance' | 'scientist';
  /** The configuration for the provider(s). */
  options: Options[];
  targets?: Targets[];
  cache?: CacheSettings;
  retry?: RetrySettings;
  strategy?: Strategy;
  customHost?: string;
}

/**
 * TODO: make this a union type
 * A message content type.
 * @interface
 */
export interface ContentType extends PromptCache {
  type: string;
  text?: string;
  thinking?: string;
  signature?: string;
  image_url?: {
    url: string;
    detail?: string;
    mime_type?: string;
  };
  data?: string;
  file?: {
    file_data?: string;
    file_id?: string;
    file_name?: string;
    file_url?: string;
    mime_type?: string;
  };
  input_audio?: {
    data: string;
    format: string; //defaults to auto
  };
}

export interface ToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
    description?: string;
  };
}

export enum MESSAGE_ROLES {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
  FUNCTION = 'function',
  TOOL = 'tool',
  DEVELOPER = 'developer',
}

export const SYSTEM_MESSAGE_ROLES = ['system', 'developer'];

export type OpenAIMessageRole =
  | 'system'
  | 'user'
  | 'assistant'
  | 'function'
  | 'tool'
  | 'developer';

export interface ContentBlockChunk extends Omit<ContentType, 'type'> {
  index: number;
  type?: string;
}

/**
 * A message in the conversation.
 * @interface
 */
export interface Message {
  /** The role of the message sender. It can be 'system', 'user', 'assistant', or 'function'. */
  role: OpenAIMessageRole;
  /** The content of the message. */
  content?: string | ContentType[];
  /** The content blocks of the message. */
  content_blocks?: ContentType[];
  /** The name of the function to call, if any. */
  name?: string;
  /** The function call to make, if any. */
  function_call?: any;
  tool_calls?: any;
  tool_call_id?: string;
  citationMetadata?: CitationMetadata;
}

export interface PromptCache {
  cache_control?: { type: 'ephemeral' };
}

export interface CitationMetadata {
  citationSources?: CitationSource[];
}

export interface CitationSource {
  startIndex?: number;
  endIndex?: number;
  uri?: string;
  license?: string;
}

/**
 * A JSON schema.
 * @interface
 */
export interface JsonSchema {
  /** The schema definition, indexed by key. */
  [key: string]: any;
}

/**
 * A function in the conversation.
 * @interface
 */
export interface Function {
  /** The name of the function. */
  name: string;
  /** A description of the function. */
  description?: string;
  /** The parameters for the function. */
  parameters?: JsonSchema;
  /** Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the parameters field. Only a subset of JSON Schema is supported when strict is true */
  strict?: boolean;
}

export interface ToolChoiceObject {
  type: string;
  function: {
    name: string;
  };
}

export type ToolChoice = ToolChoiceObject | 'none' | 'auto' | 'required';

/**
 * A tool in the conversation.
 *
 * `cache_control` is extended to support for prompt-cache
 *
 * @interface
 */
export interface Tool extends PromptCache {
  /** The name of the function. */
  type: string;
  /** A description of the function. */
  function: Function;
  // this is used to support tools like computer, web_search, etc.
  [key: string]: any;
}

/**
 * The parameters for the request.
 * @interface
 */
export interface Params {
  model?: string;
  prompt?: string | string[];
  messages?: Message[];
  functions?: Function[];
  function_call?: 'none' | 'auto' | { name: string };
  max_tokens?: number;
  max_completion_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  top_logprobs?: boolean;
  echo?: boolean;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: { [key: string]: number };
  user?: string;
  context?: string;
  examples?: Examples[];
  top_k?: number;
  tools?: Tool[];
  tool_choice?: ToolChoice;
  response_format?: {
    type: 'json_object' | 'text' | 'json_schema';
    json_schema?: any;
  };
  seed?: number;
  store?: boolean;
  metadata?: object;
  modalities?: string[];
  audio?: {
    voice: string;
    format: string;
  };
  service_tier?: string;
  prediction?: {
    type: string;
    content:
      | {
          type: string;
          text: string;
        }[]
      | string;
  };
  // Google Vertex AI specific
  safety_settings?: any;
  // Anthropic specific
  anthropic_beta?: string;
  anthropic_version?: string;
  thinking?: {
    type?: string;
    budget_tokens: number;
  };
  // Embeddings specific
  dimensions?: number;
  parameters?: any;
  [key: string]: any;
}

interface Examples {
  input?: Message;
  output?: Message;
}

/**
 * The full structure of the request body.
 * @interface
 */
interface FullRequestBody {
  /** The configuration for handling the request. */
  config: Config;
  /** The parameters for the request. */
  params: Params;
}

/**
 * A shortened structure of the request body, with a simpler configuration.
 * @interface
 */
export interface ShortConfig {
  /** The name of the provider. */
  provider: string;
  /** The name of the API key for the provider. */
  virtualKey?: string;
  /** The API key for the provider. */
  apiKey?: string;
  cache?: CacheSettings;
  retry?: RetrySettings;
  resourceName?: string;
  deploymentId?: string;
  workersAiAccountId?: string;
  apiVersion?: string;
  azureAuthMode?: string;
  azureManagedClientId?: string;
  azureEntraClientId?: string;
  azureEntraClientSecret?: string;
  azureEntraTenantId?: string;
  azureModelName?: string;
  customHost?: string;
  // Google Vertex AI specific
  vertexRegion?: string;
  vertexProjectId?: string;
}

/**
 * The shortened structure of the request body.
 * @interface
 */
interface ShortRequestBody {
  /** The simplified configuration for handling the request. */
  config: ShortConfig;
  /** The parameters for the request. */
  params: Params;
}

/**
 * The request body, which can be either a `FullRequestBody` or a `ShortRequestBody`.
 * @type
 */
export type RequestBody = FullRequestBody | ShortRequestBody;
