/// <reference path="../../typings/index.d.ts" />

namespace LccWebParts {

    class propertypane implements ng.IDirective {

        public static ID = "propertypane";

        static factory(): angular.IDirectiveFactory {
            const directive = ($compile, $templateCache) => new propertypane($compile, $templateCache);
            directive.$inject = ["$compile", "$templateCache"];
            return directive;
        }

        public link;
        controllerAs = 'vm';
        bindToController = true;
        controller: ($scope: ng.IScope) => void;

        constructor(private $compile: ng.ICompileService, private $templateCache: ng.ITemplateCacheService) {
            this.link = this.propertypane.bind(this);
        }

        propertypane (scope: ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) {
            var vm = (<any>scope).vm;

            var type = vm.fieldTypes[(<any>scope).field.type];
            var htmltemplate = this.$templateCache.get('component-' + type + '.html');
            //console.log(htmltemplate);

            element.html(<string>htmltemplate);
            this.$compile(element.contents())(scope);
        }
    }

    const module:ng.IModule = angular.module("webpartWidget");

    module.directive('uibTypeaheadDynamic', function() {
        return {
            controller: 'UibTypeaheadControllerDynamic',
            require: ['ngModel', '^?ngModelOptions', 'uibTypeaheadDynamic'],
            link: function(originalScope, element, attrs, ctrls) {
            ctrls[2].init(ctrls[0], ctrls[1]);
            }
        };
    })

        module.controller('UibTypeaheadControllerDynamic', function($scope, $element, $attrs, $interpolate, $controller) {
        $attrs.uibTypeahead = $interpolate($attrs.uibTypeaheadDynamic)($scope);
        
        angular.extend(this, $controller('UibTypeaheadController', {
            $scope: $scope,
            $element: $element,
            $attrs: $attrs
        }));
    
    })
    module.directive(propertypane.ID, propertypane.factory());
}