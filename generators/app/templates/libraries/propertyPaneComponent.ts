// /// <reference path="../index.d.ts" />

// namespace LccWebParts {
//     class propertyPaneComponent implements ng.IComponentOptions {
//         public template: string = `
//             <div class="container-fluid">
//                 <h1><i class="fa fa-info-circle"></i>&nbsp;About</h1>
//                 This architecture is written By <a href="http://brecht.io">Matt</a> to help you:
//                 <ul>
//                     <li>{{$ctrl.editIncludeUrl}}</li>
//                     <li>Webpack</li>
//                     <li>Angular 1.4</li>
//                     <li>Karma</li>
//                     <li>Jasmine</li>
//                     <li>Istanbul coverage</li>
//                 </ul>
//             </div>`;
    

//         public bindings: any = {
//             properties: "=",
//             editIncludeUrl: '<'
//         };
//         public controller: Function = WebPartController;
//     }

//     const module:ng.IModule = angular.module("webpartWidget");
//     module.component("propertyPane", new propertyPaneComponent());
// }