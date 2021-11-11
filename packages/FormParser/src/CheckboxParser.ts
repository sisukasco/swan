import {DCheckbox} from "@sisukas/form-ds";
import {BaseElementParser} from "./BaseElementParser";

export class CheckboxParser extends BaseElementParser
{
    private field:DCheckbox=new DCheckbox();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.must_check.enabled = this.isRequired();
        const v = this.getValue();
        this.field.settings.value = (v == "") ? "on":v;
        
        return this.field;
    }
}