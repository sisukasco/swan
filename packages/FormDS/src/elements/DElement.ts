import { Sidekick } from '../coder/Sidekick';
import { NodeItem} from "@sisukas/coder-interface";
import {ExcludeDefault} from "../lib/TxUtils";
import {Expose, Exclude} from "class-transformer";
import uniqid from 'uniqid';
export default class DElement
{
	static next_objid = 1

	/**
	 * pos is the position of the element in the top to bottom sequence
	 */
	@ExcludeDefault(0)
	public pos:number=0;
	
	public type:string=""
	/* TODO: Getrid of the ID/ replace with string ID */
	@Exclude()
	public id:string=uniqid()
	public name:string=""
	
	@ExcludeDefault(100)
	public width:number=100
	
	@Expose({groups: ['positions']})
	public row:number=0;
	
	@Expose({groups: ['positions']})
	public col:number=0
	
	@Expose({groups: ['positions']})
	public page:string=""

	constructor(type:string)
	{
		this.type = type;
		this.generate_id();
		this.name = type; 
	}
	
	public is_input():boolean
	{
		return false;
	}
	public is_hidden():boolean
	{
		return false;
	}
	public updateName(name:string)
	{
		this.name = name;
	}
	
	public generate_id()
	{
		this.id = uniqid()
	}
	position(row:number,col:number)
	{
		this.row = row;
		this.col = col;
	}

	setWidth(w:number){
		this.width = w
	}
	
	smaller(decr:number)
	{
		if(decr == 33){
			if(this.width == 100){
				this.width = 66
			}else if(this.width == 66){
				this.width = 33
			}
		}else{
			if(this.width - decr >= decr){
				this.width -= decr;
			}
		}
	}
	larger(incr:number)
	{

		if(incr == 33){
			if(this.width == 33){
				this.width = 66;
			}else if(this.width == 66){
				this.width = 100
			}
		} else{
			if(this.width + incr <= 100){
				this.width += incr;
			}
		}
	}

	
	static update_id_tracker(max:number)
	{
		DElement.next_objid = max+1;
	}

	
	html()
	{
		return '';
	}
	style()
	{
		return '';
	}
	code(__coder:NodeItem, _options: Sidekick)
	{
		
	}
	
}

