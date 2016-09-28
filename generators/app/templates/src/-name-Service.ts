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
        public GetEvents: (venueId: string, dayItemCount: number) => ng.IPromise<any | IError> = this.getEvents;

        public searchVenue(val: string) {
            return this.$http.get(this.appSettings.apiBaseEndpoint + 'sports/venues.json', {
                params: {
                    q: val + '*'
                }
            }).then(function(response){
                return (<any>response.data).results.map(function(item){
                    let result : IVenue = 
                        {
                            name: item.name,
                            id: item.id
                        };
                    return result;
                });
            });
        }

        getEvents(venueId: string, dayItemCount: number) {
            let defer = this.$q.defer();
            let promise: ng.IPromise<any | IError> = defer.promise;

             this.$http.get(this.appSettings.apiBaseEndpoint + 'sports/events.json', {
                params: {
                    venue: venueId,
                    pagesize: dayItemCount,
                    groupBy: "Day",
                    sortBy: "startDate",
                    sort: "date",
                    hideOccurrences: false
                }
            })
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                defer.resolve(response.data);
            })
            .catch ((reason: ng.IHttpPromiseCallbackArg<void>) => {
                defer.reject (
                    // IError
                    {
                        ErrorMessage: 'Error ' + reason.status + ': ' + reason.statusText
                    }
                );
            });

            return promise;
        }

    }


    const module:ng.IModule = angular.module("webpartWidget");
    module.service("<%= wpname %>Service", <%= wpname %>Service)
       .constant('appId', 'ecb1f756686518281c429bf5b7498d70');

}