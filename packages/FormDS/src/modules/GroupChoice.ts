import DRadioButton from "./DRadioButton";
import DCheckboxGroup from "./DCheckboxGroup";

import { NodeItem } from "@sisukas/coder-interface";

interface ChoiceItem
{
    name:string;
    value?:string;
}


export default class GroupChoice
{
    constructor(private elmnt:DCheckboxGroup|DRadioButton, private type:"checkbox"|"radio") 
    {
        
    }
    code(node:NodeItem)
    {
        let container = node.section('form.group.container');
        container.section('form.group.label').html(this.elmnt.label);
        for(let i=0;i<this.elmnt.settings.items.length;i++)
        {
            this.item_code(this.elmnt.settings.items[i],i, container);
        }
        container.section('form.input.error',{name:this.elmnt.name});

        node.style(this.style());
    }

    private item_code(item:ChoiceItem,idx:number, container:NodeItem)
    {
        let id = this.elmnt.name+'_'+idx;
        let value = item.value?item.value:item.name;

        let item_container = 
        container.section('form.group.item.container',{class:[this.group_item_class()]});

        item_container
            .section('form.input.input', {type:this.type, name:this.elmnt.name,value, id});
        
        item_container.section('form.input.label', {type:"checkbox", "for":id} ).html(item.name);
    }

    private group_item_class()
    {
        return(this.elmnt.settings.arrangement == 'horizontal' ? 'form-check-inline':'sim-check-vertical');
    }

    public style()
    {
        return(
            `.sim-group-label
            {
                display:block;
            }
            .sim-group-item.sim-check-vertical
            {
                margin-bottom:0.5rem;
            }
            .sim-group-item.form-check-inline
            {
                margin-right:1rem;
            }`       
        );
    }
}