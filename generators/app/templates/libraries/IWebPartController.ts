/// <reference path="../index.d.ts" />

namespace LccWebParts {

    export interface IWebPartController {      // Defines ViewModel for Weather Controller
        Error: string,                  // Error message
        ValidDataLoaded: boolean,       // True if forecast contains valid data
        GetProperties: (string) => void,    // Method for loading web part properties
        //MapProperties:(IWebPartProperties) => void,
        //SearchVenue: (string) => void,
        SaveConfig: (any) => void,
        //LoadEvents: () => void;
        WebPartId: string;
        IsPageEditMode: boolean;
        IsWebPartEditMode: boolean;
        configSaved: boolean;
        //AvailableTemplates: string[];
    }
}