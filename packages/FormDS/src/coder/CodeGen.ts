import { Codeable } from '@sisukas/coder-interface';
import { NodeItem } from '@sisukas/coder-interface';
import { Sidekick } from '../coder/Sidekick';

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