/// <reference path="../index.d.ts" />


namespace LccWebParts {
    export class BaseController<TProperties> implements IWebPartController {
        
        public static $inject = ["WebPartService", "$scope", "appSettings", "$templateCache"];

        WebPartService: IWebPartService;
        appSettings: any;
        scope: ng.IScope;
        templateCache: ng.ITemplateCacheService;

        // Members of Interface (ViewModel)
        public IsPageEditMode: boolean;
        public IsWebPartEditMode: boolean;
        public WebPartId: string;
        public Error: string;
        public ValidDataLoaded: boolean = false;
        public Events: any;
        public configSaved: boolean = false;

        public fieldTypes = IPropertyPaneFieldType;

        public properties: TProperties;

        //public editIncludeUrl: string = '<%= wpname%>properties.html';
        //public includeUrl: string = '<%= wpname%>render.html'

        // public methods
        public SaveConfig: (any) => void = this.saveConfig;
        //public MapProperties: (IWebPartProperties) => void = this.mapProperties;
        public GetProperties: () => void = this.getProperties;
        //public SearchVenue: (string) => void = this.searchVenue;
        //public LoadEvents:() => void = this.loadEvents;
        
        constructor (webPartService: IWebPartService,
                     $scope: ng.IScope,
                     appSettings: any,
                     $templateCache: ng.ITemplateCacheService) {
            this.WebPartService = webPartService;
            this.appSettings = appSettings;
            this.scope = $scope;
            this.templateCache = $templateCache;

            this.properties = <TProperties>{};
            
            // When the web part id is available, get the properties
            this.scope.$watch(this.WebPartId, () => { this.GetProperties(); } );
            //this.scope.$watch(this.properties, () => { this.Render(); });
            this.IsPageEditMode = this.WebPartService.IsPageInEditMode();
            console.log(appSettings.propertiesField);
        }
        
        initWebPartRender() {
            this.IsWebPartEditMode = this.WebPartService.IsWebPartInEditMode(this.WebPartId);
        }

        saveConfig(event: ng.IAngularEvent) : void {
            event.preventDefault();
            let data = {};
            data[this.appSettings.propertiesField] = JSON.stringify(this.properties);

            this.WebPartService.SaveWebPartProperty(this.WebPartId, this.appSettings.propertiesField, this.properties)
            .then(() => {
                this.configSaved = true;
                this.Render();
            });
        }

        Render() {
            
        }

        // mapProperties(properties: IWebPartProperties) : void {
        //     if(properties.Properties.get_item(this.appSettings.propertiesField)) {
        //         this.properties = JSON.parse(properties.Properties.get_item(this.appSettings.propertiesField));          
        //         // if (this.WebPartProperties.CustomItemTemplate)
        //         // {
        //         //     this.includeUrl = this.WebPartProperties.CustomItemTemplate;
        //         // }

        //         // this.loadEvents();
        //     }
        // }

        GetPropertyPaneSettings(): IPropertyPaneSettings {
            return this.propertyPaneSettings;
        }

        protected propertyPaneSettings: IPropertyPaneSettings = {
            pages: []
        };

        // Internal methods
        getProperties() : void {                
            this.WebPartService.GetWebPartProperty(this.WebPartId, this.appSettings.propertiesField)
            .then((result: any) => {
                if(result) {
                    this.properties = JSON.parse(result);
                    this.Render();
                }
            })
            .catch((reason: IError) => {
                console.error(reason.ErrorMessage);
                
            });

        }
    }

}
