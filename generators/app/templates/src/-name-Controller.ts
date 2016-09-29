/// <reference path="../typings/index.d.ts" />
/// <reference path="./index.d.ts" />
/// <reference path="./libraries/IPropertyPaneTextFieldProps.ts" />

namespace LccWebParts {
    
    export class <%= wpname%>Controller extends BaseController<I<%= wpname%>Props> {
        
        public <%= wpname %>Service: any;
        static $inject = ["<%= wpname %>Service", "WebPartService", "$scope", "appSettings", "$templateCache"];

        public editIncludeUrl: string = '<%= wpname%>properties.html';
        public includeUrl: string = '<%= wpname%>render.html'

        public AvailableTemplates: string[] = ['<%= wpname%>render.html','event-list-custom.html'];
        
        constructor (<%= wpname %>Service: any, WebPartService: IWebPartService,
                     $scope: ng.IScope,
                     appSettings: any,
                     $templateCache: ng.ITemplateCacheService) {
            super(WebPartService, $scope, appSettings, $templateCache);   
            this.<%= wpname %>Service = <%= wpname %>Service;
        }

        Render () {
          super.Render();
        }

        getTemplates() {
            return this.AvailableTemplates;
        }

        searchVenue(val) : any {
            return this.<%= wpname %>Service.SearchVenue(val);
        };

        protected propertyPaneSettings: IPropertyPaneSettings = {
          
            pages: [
              {
                header: {
                  description: "Description"
                },
                groups: [
                  {
                    groupName: "Group",
                    groupFields: [
                    PropertyPaneTextField('pagename', {
                      label: 'Enter some text',
                      description: ''
                    }),
                    PropertyPaneDropdown('pagesize', {
                      label: 'Dropdown example',
                      options: [
                        { key: '5', text: '5' },
                        { key: '10', text: '10' },
                        { key: '20', text: '20' }
                      ]}),
                    PropertyPaneTypeahead('customitemtemplate', {
                      label: 'Please choose or type a path to a template',
                      description: 'This field allows you to type ahead or enter your own value',
                      minlength: 0,
                      expression: "template for template in vm.getTemplates() | filter:$viewValue",
                    }),
                    PropertyPaneTypeahead('location', {
                      label: 'Please type to find a state',
                      minlength: 3,
                      expression: "location as location for location in vm.searchVenue($viewValue)",
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