import {INodeContext} from "./types"
import {SupplementaryCode} from "./SupplementaryCode"

export class NodeContext implements INodeContext
{
    public supp_code:SupplementaryCode= new SupplementaryCode()
                                /* implements ISupplementaryCode */
}