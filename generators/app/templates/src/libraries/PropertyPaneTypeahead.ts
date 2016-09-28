/// <reference path="../index.d.ts" />

namespace LccWebParts {
    export function PropertyPaneTypeahead(targetProperty: string, properties: IPropertyPaneTypeaheadProps): IPropertyPaneField<IPropertyPaneTypeaheadProps>
    {
        return {
            type: IPropertyPaneFieldType.Typeahead,
            targetProperty: targetProperty,
            properties: properties
        }
    }

    export interface  IPropertyPaneTypeaheadProps {
        label?: string;
        description?: string;
        minlength: number;
        expression?: any;
    }
}