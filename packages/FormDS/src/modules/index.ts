import DFormElement from "./DFormElement";
import DCheckbox from "./DCheckbox";
import DCheckboxGroup from "./DCheckboxGroup";
import DDropDown from "./DDropDown";
import DEmail from "./DEmail";
import DMultiline from "./DMultiline";
import DNumber from "./DNumber";
import DRadioButton from "./DRadioButton";
import DTextbox from "./DTextbox";
import DSubmitButton from "./DSubmitButton";
import DCalculationField from "./DCalculationField";
import DHiddenField from "./DHiddenField";
import DSimpleFileUpload from "./DSimpleFileUpload";
import DItem,{itemsFromText,getItemsJSON} from "./DItem";
import DPhone from "./DPhone";
import DURL from "./DURL";
import DDate from "./DDate";
import DRange from "./DRange";
import DDateTime from './DDateTime';
import DColor from './DColor';
import DPassword from "./DPassword";
import {IGroupItemSettings} from "./IGroupItemSettings"

export {
    DFormElement,
    DCheckbox,
    DCheckboxGroup,
    DDropDown,
    DEmail,
    DMultiline,
    DNumber,
    DRadioButton,
    DTextbox,
    DSubmitButton,
    DCalculationField,
    DSimpleFileUpload,
    DHiddenField,
    DItem,
    itemsFromText,
    getItemsJSON,
    IGroupItemSettings,
    DPhone,
    DURL,
    DDate,
    DRange,
    DDateTime,
    DColor,
    DPassword,
}

type modulemap = 
{
    [name:string]:any
}

let modules:modulemap = 
{
    DCheckbox,
    DCheckboxGroup,
    DDropDown,
    DEmail,
    DMultiline,
    DNumber,
    DRadioButton,
    DTextbox,
    DSubmitButton,
    DCalculationField,
    DSimpleFileUpload,
    DHiddenField,
    DPhone,
    DURL,
    DDate,
    DRange,
    DDateTime,
    DColor,
    DPassword,
}

export default modules;
