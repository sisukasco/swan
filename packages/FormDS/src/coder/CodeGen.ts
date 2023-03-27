import { Codeable } from '@sisukas/coder-interface';
import { NodeItem } from '@sisukas/coder-interface';
import { Sidekick } from '../coder/Sidekick';
import {generateCode} from '@sisukas/coder'
import {CoderOptions} from "./types";

export interface CodeGenNode{
    code(coder:NodeItem, sidekick: Sidekick):void
}

export class CodeGen implements Codeable{
    
    private sidekick:Sidekick

    constructor(private base:CodeGenNode, options: CoderOptions){

        this.sidekick = new Sidekick(options)
        
    }

    public code(node: NodeItem){
        this.base.code(node, this.sidekick)
    }
}

export function generateHTMLCode(base:CodeGenNode,options : CoderOptions):string{
    
    const codegen = new CodeGen(base, options)

    const genCode = generateCode(codegen)

    return  genCode.getHTMLCode(true)

}