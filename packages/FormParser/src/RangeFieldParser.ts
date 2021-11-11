import { DRange } from "@sisukas/form-ds";
import {BaseElementParser, parseElementType} from "./BaseElementParser";

export class RangeFieldParser extends BaseElementParser
{
    private field:DRange=new DRange();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        if(parseElementType(this.e) != "Range")
        {
            throw new Error("The type of this element is not Range!")
        }
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.min.num = this.getMin();
        this.field.validations.max.num = this.getMax();
        this.field.validations.multiples_of.start = this.getMin();
        this.field.validations.multiples_of.multiplicand = this.getStep();
        
        return this.field;
    }
}