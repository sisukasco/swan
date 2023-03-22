import DHeading from "./DHeading";
import DTextBlock from "./DTextBlock";
import DImage from "./DImage";
import DLabel from "./DLabel";
import DBlank from "./DBlank";
import DElement from "./DElement";

export {
    DHeading,
    DTextBlock,
    DImage,
    DLabel,
    DBlank ,
    DElement   
}

type modulemap = 
{
    [name:string]:any
}

let modules:modulemap = 
{
    DHeading,
    DTextBlock,
    DImage,
    DLabel,
    DBlank
}

export default modules;