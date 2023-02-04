import {serialize} from "class-transformer";
import {factory, DElementContainer} from "../src/lib";
import DTextbox from "../src/modules/DTextbox";
import { DTextBlock } from "../src/elements";
import FormRuntimeFactory from "../src/lib/FormRuntimeFactory";
factory.addFactory(new FormRuntimeFactory());

test("SER101: serialize element container with some form elements", ()=>{
    let elements_container = new DElementContainer();
    let vtext_box1 = elements_container.add("Textbox")
    let text_box1 = <DTextbox><unknown>vtext_box1.elmnt
    text_box1.name = "Name";
    text_box1.validations.required.enabled = true;
    text_box1.validations.maxlength.size =1024;
    text_box1.validations.minlength.size =10;

    let vtext_box2 = elements_container.add("Textbox")
    let text_box2 = <DTextbox><unknown>vtext_box2.elmnt   
    text_box2.name = "Email";
    text_box2.validations.required.enabled = true;
    text_box2.validations.maxlength.size =125;
    
    const cont = serialize(elements_container);
    console.log("container str ", cont)
})

test("SER102: serialize Textblock element", ()=>{
    let elements_container = new DElementContainer();
    let vtext_box1 = elements_container.add("TextBlock")
    let txtblock = <DTextBlock><unknown>vtext_box1.elmnt
    txtblock.content ="content"

    elements_container.clone(vtext_box1)

    //elements_container.add(cloned)

    //console.log("cloned ", cloned)
        
    const cont = serialize(elements_container);
    console.log("container str ", cont)
})