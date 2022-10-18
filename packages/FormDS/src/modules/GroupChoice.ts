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
        const container = node.section('form.input.container', { width: this.elmnt.width});
        container.section('form.group.label').html(this.elmnt.label);

        let gcontainer = container.section('form.group.container', 
        { arrangement: this.elmnt.settings.arrangement});

        for(let i=0;i<this.elmnt.settings.items.length;i++)
        {
            this.item_code(this.elmnt.settings.items[i],i, gcontainer);
        }
        gcontainer.section('form.input.error',{name:this.elmnt.name});

        node.style(this.style());
    }

    private item_code(item:ChoiceItem,idx:number, container:NodeItem)
    {
        let id = this.elmnt.name+'_'+idx;
        let value = item.value?item.value:item.name;

        let item_container = 
        container.section('form.group.item.container',{ arrangement: this.elmnt.settings.arrangement });

        item_container
            .section('form.input.input', {type:this.type, name:this.elmnt.name,value, id});
        
        item_container.section('form.input.label', {type:"checkbox", "for":id} ).html(item.name);
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