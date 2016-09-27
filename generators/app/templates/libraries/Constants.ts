/// <reference path="../index.d.ts" />
/// <reference path="../../typings/index.d.ts" />


namespace LCCWebParts {
    export class Constants {
        static get Default(): any {
            return {
                apiBaseEndpoint: "http://api.events.leeds.gov.uk/",
                propertiesField: "ImportErrorMessage"
            }
        }
    }

    const module:ng.IModule = angular.module("webpartWidget");
    module.constant("appSettings", Constants.Default);

}