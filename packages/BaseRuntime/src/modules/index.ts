import DElement from "./DElement";
import DImage from "./DImage";
import DTextBlock  from "./DTextBlock";
import DDummy  from "./DDummy";
import DHeading from "./DHeading";


type modulemap = 
{
    [name:string]:any
}

let modules:modulemap = 
{
    DElement,
    DImage,
    DTextBlock,
    DDummy,
    DHeading
}

export default modules;