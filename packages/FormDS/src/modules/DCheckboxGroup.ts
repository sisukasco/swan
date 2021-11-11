'use strict';
import DFormElement from "./DFormElement";
import {CheckboxGroupValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import GroupChoice from "./GroupChoice";
import { NodeItem } from "@sisukas/coder-interface";
import DItem from "./DItem";
import { ExcludeDefault } from '@sisukas/base-runtime';

class CheckboxGroupSettings
{
    @ExcludeDefault('vertical')
    public arrangement:string = "vertical"
    
    @Type(()=>DItem)
    public items:DItem[]=[];   
    
    addItem(name:string, value:string)
    {
        this.items.push(new DItem(name,value))
    }
}
export default
class DCheckboxGroup extends DFormElement
{
    @Type(()=>CheckboxGroupSettings)
    public settings = new CheckboxGroupSettings()

    @Type(() => CheckboxGroupValidations)
    public validations:CheckboxGroupValidations= new CheckboxGroupValidations();

    constructor()
    {
        super('CheckboxGroup', 'Choose Options');
    }
    get default_value():string[]
    {
        return [];
    }
    public code(node:NodeItem)
    {
        let gc = new GroupChoice(this,"checkbox");
        return gc.code(node);
    }
    public getConverterCode()
    {
        return(".toArray()");
    }
    
} 
