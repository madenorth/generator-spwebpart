/// <reference path="../typings/index.d.ts" />
/// <reference path="./index.d.ts" />
/// <reference path="./libraries/IPropertyPaneTextFieldProps.ts" />

namespace LccWebParts {
    
    export class <%= wpname%>Controller extends BaseController<I<%= wpname%>Props> {
        
        static $inject = ["WebPartService", "$scope", "appSettings", "$templateCache"];
        
        public AvailableTemplates: string[] = ['<%= wpname%>render.html','event-list-custom.html'];

        public editIncludeUrl: string = '<%= wpname%>properties.html';
        public includeUrl: string = '<%= wpname%>render.html'
        
        constructor (WebPartService: IWebPartService,
                     $scope: ng.IScope,
                     appSettings: any,
                     $templateCache: ng.ITemplateCacheService) {
            super(WebPartService, $scope, appSettings, $templateCache);   

            this.properties.CustomItemTemplate = "<%= wpname%>render.html"; // _spPageContextInfo.siteServerRelativeUrl + "/Style Library/wwTest/Views/eventlistrender.html";
        }

        
        getTemplates() {
            return this.AvailableTemplates;
        }
        
        searchVenue(val) : any {
            return this.WebPartService.SearchVenue(val);
        };

        loadEvents() : void {
            if(this.properties.Venue) 
            {
                console.log("loading events for " + this.properties.Venue.id);
                this.WebPartService.GetEvents(this.properties.Venue.id, this.properties.PageSize)
                .then((result: any) => {
                        this.Events = result
                })
                .catch((reason: IError) => {
                    console.error(reason.ErrorMessage);
                    
                })
            }
        }

        Render () {
          super.Render();
          if (this.properties.CustomItemTemplate)
          {
              this.includeUrl = this.properties.CustomItemTemplate;
          }

          this.loadEvents();
        }

        protected propertyPaneSettings: IPropertyPaneSettings = {
          
            pages: [
              {
                header: {
                  description: "Description"
                },
                groups: [
                  {
                    groupName: "GroupName",
                    groupFields: [
                    // PropertyPaneTextField('CustomItemTemplate', {
                    //   label: 'Please choose or type a path to a template',
                    //   description: ''
                    // }),
                    PropertyPaneDropdown('PageSize', {
                      label: 'Items to show per day',
                      options: [
                        { key: '5', text: '5' },
                        { key: '10', text: '10' },
                        { key: '20', text: '20' }
                      ]}),
                    PropertyPaneTypeahead('CustomItemTemplate', {
                      label: 'Please choose or type a path to a template',
                      minlength: 0,
                      expression: "template for template in vm.getTemplates() | filter:$viewValue",
                    }),
                    PropertyPaneTypeahead('Venue', {
                      label: 'Please type to choose a Venue',
                      minlength: 3,
                      expression: "venue as venue.name for venue in vm.searchVenue($viewValue)",
                    })
                  ]
                  }
                ]
              }
            ]
          };
    }
    
    const module:ng.IModule = angular.module("webpartWidget");
    module.controller("<%= wpname%>Controller", <%= wpname%>Controller);
        
}