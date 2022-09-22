import DElement from "../modules/DElement";
import { NodeItem} from "@sisukas/coder-interface";
import "reflect-metadata";
import {Exclude} from "class-transformer";
import ElementTX from "./ElementTX";

export default class VisualElement
{
	@ElementTX()
	public elmnt:DElement;
	
	@Exclude()
	public showing_props:boolean;
	
	@Exclude()
	public selected:boolean;
	
	@Exclude()
	public is_editing:boolean;

    constructor(data_element:DElement)
    {
        this.elmnt = data_element;

        this.showing_props=false;
		this.selected=false;
		this.is_editing=false;
    }
    get width()
    {
        return this.elmnt.width;
    }
    get id()
    {
        return this.elmnt.id;
    }
    class_obj()
	{
		let ret ={
			selected_item: false,
			showing_props:false,
			full_width: this.width == 100,
			smaller: this.width < 100
		};
		if(this.showing_props)
		{
			ret.showing_props = true;
		}
		else if(this.selected)
		{
			ret.selected_item = true;
		}
		return ret;
	}
	css_classes()
	{
		let classes =[];
		if(33 == this.elmnt.width)
		{
			classes.push('col-4')
		}
		else if(66 == this.elmnt.width)
		{
			classes.push('col-8')
		}
		else
		{
			classes.push('col-12')
		}
		return classes.join(' ');
	}
    
    select()
	{
		this.selected = true;
	}
	unselect()
	{
		this.selected = false;
		this.hide_props();
	}
	show_props()
	{
		this.showing_props = true;
	}
	hide_props()
	{
		this.showing_props = false;
	}
	style_obj()
	{
		return ({
			'flex-basis':this.width+'%',
			'max-width':this.width+'%'
		});
	}
	
	smaller()
	{
		this.elmnt.smaller();
	}
	larger()
	{
		this.elmnt.larger();
	}
	
	code(node:NodeItem)
	{
		//const coder = node.section('layout.col', {width:this.elmnt.width});
		this.elmnt.code(node);
	}

}
