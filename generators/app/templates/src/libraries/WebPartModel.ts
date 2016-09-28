/// <reference path="../../typings/index.d.ts" />

namespace LccWebParts {
    export interface IError {
        ErrorMessage: string;
    }

    export interface IWebPartProperties {
        Properties: SP.PropertyValues;
        Definition: SP.WebParts.WebPartDefinition;
        ClientContext: SP.ClientContext;
    }
}