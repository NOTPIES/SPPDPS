import express from "express";
import { ApiError } from "./Errors";

declare module "express-serve-static-core" {
  interface Response {
    error(
      err: ApiError,
      vars?: string[],
      extra?: {
        moreInfo?: string;
        transactionTime?: string;
        transactionId?: string;
        environment?: string;
      }
    ): void;
  }
}

express.response.error = function (
  err: ApiError,
  vars: string[] = [],
  extra?: {
    moreInfo?: string;
    transactionTime?: string;
    transactionId?: string;
    environment?: string;
  }
) {
  if (this.statusCode === 200) {
    this.status(err.httpCode);
  }

  this.json(err.package(vars, extra));
};
