
namespace LccWebParts {

/**
 * Enum for all the supported PropertyPane field types.
 *
 * Names should be consistent with those in office-ui-fabric-react, be careful to get letter casing correct.
 */
export enum IPropertyPaneFieldType {
    /**
     * Custom field.
     */
    Custom = 1,
    /**
     * Checkbox field.
     */
    CheckBox = 2,
    /**
     * TextField field.
     */
    TextField = 3,
    /**
     * Toggle field.
     */
    Toggle = 5,
    /**
     * Dropdown field.
     */
    Dropdown = 6,
    /**
     * Label field.
     */
    Label = 7,
    /**
     * Slider field.
     */
    Slider = 8,
    /**
     * Heading field.
     */
    Heading = 9,
    /**
     * Choice Group field.
     */
    ChoiceGroup = 10,
    /**
     * Button field.
     */
    Button = 11,
    /**
     * Horizontal Rule field.
     */
    HorizontalRule = 12,
    /**
     * Link field.
     */
    Link = 13,

    Typeahead = 14,
}

export interface IPropertyPaneTextFieldProps {
    label?: string;
    description?: string;
}

export interface IPropertyPaneSettings {
    /**
     * Page to be displayed on the PropertyPane.
     */
    currentPage?: number;
    /**
     * Total number of pages on the PropertyPane.
     */
    pages: IPropertyPanePage[];
}

export interface IPropertyPaneGroup {
    /**
     * Display name for the group.
     */
    groupName?: string;
    /**
     * List of PropertyPane fields.
     */
    groupFields: IPropertyPaneField<any>[];
}

/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PropertyPanePage related interfaces.
 */
/**
 * PropertyPanePage props.
 */
export interface IPropertyPanePageProps {
    /**
     * Description of the page.
     */
    pageDescription: string;
    /**
     * Indicates whether the groups on the PropertyPanePage should be displayed as an Accordion or not.
     * Defaullt value is false.
     */
    displayGroupsAsAccordion: boolean;
    /**
     * Callback triggered when there is a change in any of the PropertyPaneFields.
     */
    onChange: (targetProperty: string, value: boolean | string) => void;
    /**
     * An array of PropertyPaneGroups to be displayed.
     */
    propertyGroups: IPropertyPaneGroup[];
    /**
     * Properties bag of the web part.
     */
    properties: any;
    /**
     * Callback to set the entry state of the PropertyPane.
     * This callback internally is responsible for changing the state of 'Apply'/'Cancel' buttons and
     * update the invalidEntries dictionary.
     */
    setEntryState: (targetProperty: string, isValidEntry: boolean) => void;
    /**
     * Callback method, which sets the PropertyPanePage element as the container for all the elements
     * within the ProeprtyPanePage. This is used to get the first focussable element within the container
     * to set the focus to.
     */
    setContainerDiv: (propertypanepage: HTMLDivElement) => void;
}
/**
 * PropertyPanePage interface.
 */
export interface IPropertyPanePage {
    /**
     * Indicates whether the groups on the PropertyPanePage are displayed as accordion or not.
     */
    displayGroupsAsAccordion?: boolean;
    /**
     * PropertyPane page header.
     */
    header?: IPropertyPanePageHeader;
    /**
     * List of groups to be displayed on the PropertyPane page.
     */
    groups: IPropertyPaneGroup[];
}
/**
 * PropertyPane header.
 *   This header remains same for all the pages.
 */
export interface IPropertyPanePageHeader {
    /**
     * Header to display.
     */
    description: string;
    /**
     * Image url for the background image.
     */
    image?: string;
}

// type PropertyPaneFieldType = IPropertyPaneFieldType & string;

// var barId: PropertyPaneFieldType;

export function PropertyPaneTextField(targetProperty: string, properties: IPropertyPaneTextFieldProps): IPropertyPaneField<IPropertyPaneTextFieldProps>
{
    return {
        type: IPropertyPaneFieldType.TextField,
        targetProperty: targetProperty,
        properties: properties
    }
}

export function PropertyPaneDropdown(targetProperty: string, properties: IPropertyPaneDropdownProps): IPropertyPaneField<IPropertyPaneDropdownProps>
{
    return {
        type: IPropertyPaneFieldType.Dropdown,
        targetProperty: targetProperty,
        properties: properties
    }
}

export interface IPropertyPaneDropdownProps {
    /**
     * Descriptive label for the Dropdown.
     */
    label: string;
    /**
     * The key of the initially selected option.
     */
    selectedKey?: string | number;
    /**
     * Collection of options for this Dropdown.
     */
    options?: IPropertyPaneDropdownOption[];
    /**
     * Whether or not the Dropdown is disabled.
     */
    isDisabled?: boolean;
}
export interface IPropertyPaneDropdownOption {
    /**
     * A key to uniquely identify this option.
     */
    key: string | number;
    /**
     * Text to render for this option.
     */
    text: string;
    /**
     * Index for this option.
     */
    index?: number;
    /**
     * Whether this option is currently selected.
     */
    isSelected?: boolean;
}

export interface IPropertyPaneField<TProperties> {
    /**
     * Type of the PropertyPane field.
     */
    type: IPropertyPaneFieldType;
    /**
     * Target property from the web part's property bag.
     */
    targetProperty: string;
    /**
     * Strongly typed properties object. Specific to each field type.
     * Example: Checkbox has ICheckboxProps, TextField has ITextField props.
     *
      * @internalremarks - These props are from the office-ui-fabric-react.
      *   These props may not be extensive as the fabric-react ones. This is intentional.
      *     - We are not including any callbacks as part of the props, as this might end up breaking
      *       the internal flow and cause unwanted problems.
      *     - Currently discussions are going on whether to include styling elements or not. Based on
      *       the output of the discussions, changes to the styling related props will take place.
      *
      *   We are including only those which are supported by the web part framework.
     */
    properties: TProperties;
}

}