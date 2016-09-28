/// <reference path="../index.d.ts" />

namespace LccWebParts {

    export interface IWebPartService {     // WebPart interface
        GetWebPartProperties(string): ng.IPromise<IWebPartProperties | IError>;
        GetWebPartProperty(webPartId: string, propertyName: string);
        SaveWebPartProperties(string, any): ng.IPromise<void | IError>;
        SaveWebPartProperty(webPartId: string, propertyName: string, object: any): ng.IPromise<void | IError>;
        IsPageInEditMode(): boolean;
        IsWebPartInEditMode(string): boolean;
    }
}