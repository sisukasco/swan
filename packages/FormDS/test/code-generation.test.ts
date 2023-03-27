import {DElementContainer} from "../src/lib/DElementContainer"
import { generateHTMLCode } from './../src/coder/CodeGen';

test("GENCODE101: generate element container code", ()=>{
    let container = new DElementContainer();
    container.add("Textbox");
    container.add("Textbox");


    const code = generateHTMLCode(container, {cssFramework:"bootstrap"})

    console.log("generated code ", code)
    //expect(code).toBe('<div class="container"><div class="row mb-3"><div class="col-12"><div class="sim-textblock">The contents of the text block</div></div></div><div class="row mb-3"><div class="col-12"><div class="sim-textblock">The contents of the text block</div></div></div></div>')
    
})