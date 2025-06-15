import { ENVIRONMENT } from "./Constants";

export type ApiErrorNamespace = "UbiServices.Gateway" | "Shipyard.Parameters.Api.Services";

export interface ApiErrorOutput {
  errorCode: number;
  message: string;
  httpCode: number;
  errorContext: string;
  moreInfo?: string;
  transactionTime?: string;
  transactionId?: string;
  environment?: string;
}

export class ApiError {
  namespace: ApiErrorNamespace;
  errorCode: number;
  errorContext: string;
  messageTemplate: string;
  httpCode: number;
  moreInfoDefault?: string;
  environmentDefault?: string;

  constructor(
    httpCode: number,
    errorContext: ApiErrorNamespace,
    errorCode: number,
    messageTemplate: string,
    moreInfoDefault?: string,
    environmentDefault?: string
  ) {
    this.httpCode = httpCode;
    this.namespace = errorContext;
    this.errorCode = errorCode;
    this.errorContext = errorContext;
    this.messageTemplate = messageTemplate;
    this.moreInfoDefault = moreInfoDefault;
    this.environmentDefault = environmentDefault ?? ENVIRONMENT;
  }

  package(
    vars: string[] = [],
    extra: {
      moreInfo?: string;
      transactionTime?: string;
      transactionId?: string;
      environment?: string;
    } = {}
  ): ApiErrorOutput {
    const message = this.messageTemplate.replace(/:(\d+)/g, (_, indexStr) => {
      const i = parseInt(indexStr, 10);
      return vars[i] !== undefined ? vars[i] : `:${i}`;
    });

    if (!extra.transactionTime)
        extra.transactionTime = new Date().toISOString();

    if (!extra.transactionId)
        extra.transactionId = crypto.randomUUID();

    return {
      errorCode: this.errorCode,
      message,
      httpCode: this.httpCode,
      errorContext: this.errorContext,
      moreInfo: extra.moreInfo ?? this.moreInfoDefault ?? "",
      transactionTime: extra.transactionTime,
      transactionId: extra.transactionId,
      environment: extra.environment ?? this.environmentDefault,
    };
  }
}

export const E_ResourceNotFound = new ApiError(
  404,
  "UbiServices.Gateway",
  1003,
  "Resource ':0' not found."
);

export const E_MissingHeader = new ApiError(
  400,
  "Shipyard.Parameters.Api.Services",
  1,
  "':0' header is missing and is required.",
  "",
  "prod"
);