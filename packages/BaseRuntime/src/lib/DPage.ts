import VisualElement from "./VisualElement";
import { NodeItem} from "@sisukas/coder-interface";
import uniqid from 'uniqid';
import "reflect-metadata";
import {Type} from "class-transformer";
import { ExcludeDefault } from "./TxUtils"

export default class DPage
{
    @ExcludeDefault("")
    public title:string="";
    
    @ExcludeDefault("")
    public condition:string="";
    
    @Type(()=>VisualElement)
    public rows:VisualElement[][]=[];
    
    @ExcludeDefault(0)
    public sort_position:number=0;

    constructor(public readonly id:string=uniqid())
    {

    }
    
    code(node:NodeItem)
    {
        const page = node.section('layout.page')
        for(let row of this.rows)
        {
            let rcode = page.section("layout.row")
            for(let velmnt of row)
            {
                velmnt.code(rcode)
            }
        }
    }
}