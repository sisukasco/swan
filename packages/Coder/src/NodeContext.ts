import {INodeContext} from "./types"
import {CodeFactory} from "./CodeFactory"
import {SupplementaryCode} from "./SupplementaryCode"

export class NodeContext implements INodeContext
{
    public builder:CodeFactory= new CodeFactory(this) 
                                /*implements INodeBuilder*/
    public supp_code:SupplementaryCode= new SupplementaryCode()
                                /* implements ISupplementaryCode */
}