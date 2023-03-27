import { deserialize } from 'class-transformer';
import { serialize } from 'class-transformer';
import {factory, DElementContainer} from "../src/lib";

test("CONTAINER001: add elements", ()=>{

    let container = new DElementContainer();

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.numRows()).toBe(5)

})

test("CONTAINER002: clone one element", ()=>{

    let container = new DElementContainer();
    container.setColCount(4)

    const newElemt = factory.makeObject("Textbox");
    container.addElements([newElemt]);


    container.makeElementSmaller(0,0)
    container.makeElementSmaller(0,0)
    container.makeElementSmaller(0,0)

    
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    

    expect(container.numRows()).toBe(1)
})

test("CONTAINER003: clone one element row overflow", ()=>{

    let container = new DElementContainer();
    container.setColCount(4)
    
    const newElemt = factory.makeObject("Textbox");
    container.addElements([newElemt]);

    container.makeElementSmaller(0,0)
    container.makeElementSmaller(0,0)
    container.makeElementSmaller(0,0)

    
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    

    expect(container.numRows()).toBe(2)
})

test("CONTAINER004: remove elements ", ()=>{

    let container = new DElementContainer();

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.numRows()).toBe(5)

    container.remove(container.elementAt(2,0))

    expect(container.numRows()).toBe(4)

    container.remove(container.elementAt(1,0))

    expect(container.numRows()).toBe(3)

    container.remove(container.elementAt(1,0))

    expect(container.numRows()).toBe(2)

    container.remove(container.elementAt(1,0))

    expect(container.numRows()).toBe(1)

    container.remove(container.elementAt(0,0))

    expect(container.numRows()).toBe(0)

})

test("CONTAINER005: remove element from row with multiple elements ", ()=>{

    let container = new DElementContainer();
    container.setColCount(4)

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.numRows()).toBe(5)

    
    container.makeElementSmaller(1,0)
    container.makeElementSmaller(1,0)

    expect(container.clone(container.elementAt(1,0)))

    expect(container.numRows()).toBe(5)

    expect(container.getRowLength(1)).toBe(2)

})

test("CONTAINER006: drag last element upwards ", ()=>{

    let container = new DElementContainer();

    container.setColCount(4)

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.numRows()).toBe(5)

    container.makeElementSmaller(1,0)
    container.makeElementSmaller(1,0)
    container.makeElementSmaller(4,0)
    container.makeElementSmaller(4,0)


    
    container.printPicture();

    const elmnt = container.elementAt(4,0)
    container.removeElementAt(4,0)
    
    container.pushToRow(1, [elmnt])

    container.normalize_elements();

    container.printPicture();

    expect(container.numRows()).toBe(4)


})

test("CONTAINER007: clone element eventually causing row overflow ", ()=>{

    let container = new DElementContainer();

    container.setColCount(4); // meaning element is 25%

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.numRows()).toBe(5)

    container.clone(container.elementAt(1,0));
    container.clone(container.elementAt(1,0));
    container.clone(container.elementAt(1,0));
    container.clone(container.elementAt(1,0));
    

    expect(container.numRows()).toBe(6)
    
})

test("CONTAINER008: serialization and deserialization ", ()=>{
    let container = new DElementContainer();
    container.setColCount(4);

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }
    
    container.clone(container.elementAt(1,0));
    container.clone(container.elementAt(1,0));
    container.clone(container.elementAt(1,0));
    container.clone(container.elementAt(1,0));
    
    const strContainer = serialize(container)

    const obj = JSON.parse(strContainer)
    //const strFormatted = JSON.stringify(obj, null, 2)
    //console.log("serailized\n", strFormatted)

    expect(obj.pages.length).toBe(1)
    expect(obj.pages[0].rowsx.length).toBe(6)
})

test("CONTAINER009: serialization and deserialization ", ()=>{

    const strContainer=`
    {
        "pages":[
            {
                "id": "1zl4mi4lfawmiyo",
                "rows":[
                    [
                        {
                            "elmnt": {
                              "type": "Textbox",
                              "name": "Textbox",
                              "label": "Your Question Here:",
                              "validations": {},
                              "settings": {}
                            }
                        }
                    ],
                    [
                        {
                            "elmnt": {
                              "type": "Textbox",
                              "name": "Textbox_1",
                              "width": 50,
                              "label": "Your Question Here:",
                              "validations": {},
                              "settings": {}
                            }
                          },
                          {
                            "elmnt": {
                              "type": "Textbox",
                              "name": "Textbox_5",
                              "width": 50,
                              "label": "Your Question Here:",
                              "validations": {},
                              "settings": {}
                            }
                          }
                    ]
                ]                
            }
        ]
    }
    
    `

    let  container = deserialize(DElementContainer,strContainer)
    container.afterDeserialization();

    expect(container.numRows()).toBe(2)
    expect(container.getRowLength(1)).toBe(2)

    const strContainer2 = serialize(container)
    const obj = JSON.parse(strContainer2)
    //const strFormatted = JSON.stringify(obj, null, 2)
    //console.log("serailized\n", strFormatted)    

    expect(obj.pages[0].rows).toBeUndefined()
})