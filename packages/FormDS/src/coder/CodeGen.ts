import { Codeable } from '@sisukas/coder-interface';
import { NodeItem } from '@sisukas/coder-interface';
import { Sidekick } from '../coder/Sidekick';
import {generateCode} from '@sisukas/coder'

export interface CodeGenNode{
    code(coder:NodeItem, sidekick: Sidekick):void
}

export class CodeGen implements Codeable{
    
    private sidekick=new Sidekick()

    constructor(private base:CodeGenNode){

    }

    public code(node: NodeItem){
        this.base.code(node, this.sidekick)
    }
}

export function generateHTMLCode(base:CodeGenNode):string{
    const codegen = new CodeGen(base)

    const genCode = generateCode(codegen)

    return  genCode.getHTMLCode(true)

}