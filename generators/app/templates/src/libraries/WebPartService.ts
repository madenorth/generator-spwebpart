/// <reference path="../../typings/index.d.ts" />
/// <reference path="../index.d.ts" />


namespace LccWebParts {

    declare var MSOLayout_IsWikiEditMode;

    export class WebPartService implements IWebPartService {
                      

        static $inject = ["$http", "$q", "appId", "appSettings"];
        constructor(
            private $http: ng.IHttpService, 
            private $q: ng.IQService, 
            private appId: string,
            private appSettings: any) { }

        // Implement IWebPartService

        public GetWebPartProperties: (string) => ng.IPromise<IWebPartProperties | IError> = this.getWebPartProperties;
        public SaveWebPartProperties: (string, any) => ng.IPromise<void | IError> = this.saveWebPartProperties;
        public SaveWebPartProperty: (webPartId: string, propertyName: string, object: any) => ng.IPromise<void | IError> = this.saveWebPartProperty;
        public GetWebPartProperty: (webPartId: string, propertyName: string) => ng.IPromise<any | IError> = this.getWebPartProperty;

        public IsPageInEditMode: () => boolean = this.isPageInEditMode;
        public IsWebPartInEditMode: (string) => boolean = this.isWebPartInEditMode;

        public isWebPartInEditMode(WebPartId: string) {
            var editPaneBody = document.getElementsByClassName("ms-TPBody");
            if(!editPaneBody[0]) {
                return false;
            }
            var toolPaneWPId = editPaneBody[0].id.split("_").slice(-5).join("-");
            return (this.isPageInEditMode() && (toolPaneWPId === WebPartId));
        }

        public isPageInEditMode() {
            var formName = (typeof (<any>window).MSOWebPartPageFormName === "string") ? (<any>window).MSOWebPartPageFormName : "aspnetForm";
            var form = window.document.forms[formName];

            if(form && (((<any>form).MSOLayout_InDesignMode && (<any>form).MSOLayout_InDesignMode.value) || 
            (typeof (<any>window).MSOLayout_IsWikiEditMode === "function" && MSOLayout_IsWikiEditMode()))
            ) {
                return true;
            }
            else {
                return false;
            }
        }

        getWebPartProperty(webPartId: string, propertyName: string) {
            return this.getWebPartProperties(webPartId)
            .then((data: IWebPartProperties) => {
                return data.Properties.get_item(propertyName);
            })
        }

        public getWebPartProperties(webPartId: string) {
            let defer = this.$q.defer();
            let promise: ng.IPromise<IWebPartProperties | IError> = defer.promise;

            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', () => {
                const clientContext = SP.ClientContext.get_current();
                const file = clientContext.get_web().getFileByServerRelativeUrl(_spPageContextInfo.serverRequestPath);
                const limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                const webParts = limitedWebPartManager.get_webParts();

                clientContext.load(webParts);
                clientContext.executeQueryAsync(
                    () => {
                        let webPartDef: SP.WebParts.WebPartDefinition = null;
                        for(let x: number = 0; x < webParts.get_count() && !webPartDef; x++) {
                            let tempItem = webParts.get_item(x);
                            if(tempItem.get_id().toString() === webPartId)
                            {
                                webPartDef = tempItem;
                            }
                        }
                        
                        if(!webPartDef)
                        {
                            defer.reject({ ErrorMessage: "WebPart not found"});
                            return;
                        }
                        
                        let webPartProperties = webPartDef.get_webPart().get_properties();
                        clientContext.load(webPartProperties);
                        clientContext.executeQueryAsync(
                            () => {
                                defer.resolve(
                                    { //IWebPartProperties
                                    Properties: webPartProperties,
                                    Definition: webPartDef,
                                    ClientContext: clientContext 
                                });
                            },
                            () => {
                                defer.reject(
                                    {
                                        ErrorMessage: "Error: Failed loading web part properties"
                                    });
                            }
                        ) 
                    },
                    () => {
                        defer.reject(
                            // IError
                            {
                                ErrorMessage: "Error: Failed to load web part collection"
                            }
                            );
                    }
                )
        
            });
        return promise
    }

    saveWebPartProperties(webPartId: string, data: any)
    {
        let defer = this.$q.defer();
        let promise: ng.IPromise<any | IError> = defer.promise;

        this.getWebPartProperties(webPartId).then((props: IWebPartProperties) => {
            let def: SP.WebParts.WebPartDefinition = props.Definition;
            let wpProps: SP.PropertyValues =  props.Properties;
            let clientContext: SP.ClientContext = props.ClientContext;

            for (let key in data) {
                wpProps.set_item(key, data[key]);
            }

            def.saveWebPartChanges();
            clientContext.executeQueryAsync(
                () => {
                    defer.resolve();
                },
                () => {
                    defer.reject (
                        // IError
                        {
                            ErrorMessage: 'Error: Could not save webpart changes'
                        }
                    );
                }
            )

        });

        return promise;
    }

    saveWebPartProperty(wpId: string, propertyName: string, object: any) {
        let data = {};
        data[propertyName] =  JSON.stringify(object)

        return this.saveWebPartProperties(wpId, data);
    }

    }


    const module:ng.IModule = angular.module("webpartWidget");
    module.service("WebPartService", WebPartService)
       .constant('appId', 'ecb1f756686518281c429bf5b7498d70');

}