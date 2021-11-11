import {DHiddenField} from "@sisukas/form-ds";
import {BaseElementParser} from "./BaseElementParser";

export class HiddenFieldParser extends BaseElementParser
{
    private field:DHiddenField=new DHiddenField();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        this.field.name = this.getName();
        this.field.settings.value = this.getValue();
        return this.field;
    }
}