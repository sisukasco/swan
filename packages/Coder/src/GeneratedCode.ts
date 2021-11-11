
import {SupplementaryCode} from "./SupplementaryCode"
import HNode from "./HNode"
import {IGeneratedCode} from "./types"
import BaseNodeGen from "./BaseNodeGen"
import SpacedNodeGen from "./SpacedNodeGen"

export default class GeneratedCode implements IGeneratedCode
{
    constructor(private rootNode:HNode, 
        private supp_code:SupplementaryCode){}
    public getHTMLCode(indent:boolean=false):string
    {
        const nodegen = indent ? 
                new SpacedNodeGen(this.rootNode):
                new BaseNodeGen(this.rootNode);
                
        return nodegen.code()
    }
    
    public getSuppCode(){
        return this.supp_code
    }
}
