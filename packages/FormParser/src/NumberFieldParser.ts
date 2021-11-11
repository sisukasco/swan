import {DNumber} from "@sisukas/form-ds";
import {BaseElementParser, parseElementType} from "./BaseElementParser";

export class NumberFieldParser extends BaseElementParser
{
    private field:DNumber=new DNumber();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        if(parseElementType(this.e) != "Number")
        {
            throw new Error("The type of this element is not number!")
        }
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.min.num = this.getMin();
        this.field.validations.max.num = this.getMax();
        return this.field;
    }
}