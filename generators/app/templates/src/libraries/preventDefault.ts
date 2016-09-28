/// <reference path="../../typings/index.d.ts" />
namespace LccWebParts {
    class preventDefault implements ng.IDirective {
        static instance() : ng.IDirective {
            return new preventDefault();
        }

        public link;

        constructor() {
            this.link = this.unboundLink.bind(this);
        }

        unboundLink ($scope: ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) {
            angular.element(element).bind('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            //template = 'Search: <input type="text" ng-model="vm.filter" /> {{ vm.message }}';
            //restrict = 'E';
            // scope = {
            //     filter: '='
            // };
            // controller: ($scope: ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => void;
            // controllerAs = 'vm';
            // bindToController = true;

            // constructor() {
            //     this.controller = function ($scope: ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) {
            //         var vm = this;
            //         angular.element(element).bind('click', function(event) {
            //         event.preventDefault();
            //         event.stopPropagation();
            //     });
            //     };
            // }
        }
    }

    const module:ng.IModule = angular.module("webpartWidget");
        module.directive("preventDefault", preventDefault.instance);
}