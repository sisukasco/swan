import {DElementContainer} from "@sisukas/base-runtime"
import {generateCode} from "@sisukas/coder"

test("GENCODE101: generate element container code", ()=>{
    let container = new DElementContainer();
    container.add("TextBlock");
    container.add("TextBlock");
    const gc = generateCode(container, {framework:"bootstrap"})
    const code = gc.getHTMLCode(false)
    //console.log("generated code ", code)
    expect(code).toBe('<div class="container"><div class="page"><div class="row my-3"><div class="col-12"><div class="sim-textblock">The contents of the text block</div></div></div><div class="row my-3"><div class="col-12"><div class="sim-textblock">The contents of the text block</div></div></div></div></div>')
    
})