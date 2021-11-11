import {DColor} from "@sisukas/form-ds";
import {BaseElementParser, parseElementType} from "./BaseElementParser";

export class ColorFieldParser extends BaseElementParser
{
    private field:DColor=new DColor();
    constructor(e:HTMLElement)
    {
        super(e);
        
    }
    public parse()
    {
        if(parseElementType(this.e) != "Color")
        {
            throw new Error("The type of this element is not color!")
        }
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = true;
        this.field.validations.content_type.type='color'
        return this.field;
    }
}