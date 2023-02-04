import DHeading from "../elements/DHeading";
import DTextBlock from "../elements/DTextBlock";
import DImage from "../elements/DImage";

export {
    DHeading,
    DTextBlock,
    DImage    
}

type modulemap = 
{
    [name:string]:any
}


let modules:modulemap = 
{
    DHeading,
    DTextBlock,
    DImage    
}

export default modules;