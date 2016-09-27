/// <reference path="../../typings/index.d.ts" />

namespace LccWebParts {

    class bindwebpartid implements ng.IDirective {
        static instance() : ng.IDirective {
            return new bindwebpartid();
        }

        public link;
        controllerAs = 'vm';
        bindToController = true;
        controller: ($scope: ng.IScope) => void;  

        constructor() {
            this.link = this.bindwebpartid.bind(this);
        }

        bindwebpartid (scope: ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) {
            var vm = (<any>scope).vm;

            vm.WebPartId = element.closest('[webpartid]').attr('webpartid');
            vm.initWebPartRender();
            console.log(element.closest('[webpartid]').attr('webpartid'));
        }
    }

    const module:ng.IModule = angular.module("webpartWidget");
    module.directive("bindwebpartid", bindwebpartid.instance);
}