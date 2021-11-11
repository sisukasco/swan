'use strict';
import DFormElement from "./DFormElement";
import {DropdownValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { NodeItem } from "@sisukas/coder-interface";
import { ExcludeEmpty } from '@sisukas/base-runtime';
import DItem from "./DItem";
class DropDownSettings
{
    @Type(()=>DItem)
    public items:DItem[]=[];
    
    public set items_text(str_items:string)
    {
        this.items = str_items.split(/\r?\n/)
                .map( (itm:string)=>(itm.trim()))
                .filter(itm=>itm && itm.length>0)
                .map((itm:string)=>(new DItem(itm, itm)));
        
    }
    public get items_text()
    {
        return this.items.map((itm)=>(itm.value)).join("\n")
    }
}
export default
class DDropDown extends DFormElement
{
    @Type(()=>DropDownSettings)
    public settings = new DropDownSettings()

    @Type(() => DropdownValidations)
    @ExcludeEmpty((v)=>(v.hasValidations()))
    public readonly validations = new DropdownValidations();


    public get items():DItem[]
    {
        return this.settings.items;
    }

    constructor()
    {
        super('DropDown','Your Question Here:');
    }
    get default_value()
    {
        return('');
    }
    
    public code(node:NodeItem)
    {
        const container = node.section('form.input.container');
        container.section('form.input.label', {'for':this.name}).html(this.label);
        
        const sel = container.section('form.input.select',{
                        name:this.name,
                        id:this.name});

        for(let i=0;i<this.items.length;i++)
        {
            const attrs:any={};
            if(i==0)
            {
                attrs.value='';
            }
            
            sel.startTag('option', attrs).text(this.items[i].value);
        }
        container.section('form.input.error',{name:this.name});

    }
    
}
