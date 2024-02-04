/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'docs';

export interface Empty {}

export interface CreateDocsMessage {
  company: string;
  docs: DocsMessage[];
}

export interface DocsMessage {
  title: string;
  createdAt: string;
  originUri: string;
  imageUri?: string | undefined;
}

export const DOCS_PACKAGE_NAME = 'docs';

export interface DocsServiceClient {
  createDocs(request: CreateDocsMessage): Observable<Empty>;
}

export interface DocsServiceController {
  createDocs(request: CreateDocsMessage): Promise<Empty> | Observable<Empty> | Empty;
}

export function DocsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createDocs'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('DocsService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('DocsService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DOCS_SERVICE_NAME = 'DocsService';
