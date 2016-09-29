/// <reference path="../typings/index.d.ts" />
/// <reference path="./index.d.ts" />


namespace LccWebParts {

    export class <%= wpname %>Service {

        static $inject = ["$http", "$q", "appId", "appSettings"];
        constructor(
            private $http: ng.IHttpService, 
            private $q: ng.IQService, 
            private appId: string,
            private appSettings: any) { }

    

        public SearchVenue: (string) => ng.IPromise<any | IError> = this.searchVenue;

        public searchVenue(val: string) {
            return this.$http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
            }).then(function(response){
                return (<any>response.data).results.map(function(item){
                    return item.formatted_address;
                });
            });

        }

    }

    const module:ng.IModule = angular.module("webpartWidget");
    module.service("<%= wpname %>Service", <%= wpname %>Service)
       .constant('appId', 'ecb1f756686518281c429bf5b7498d70');

}