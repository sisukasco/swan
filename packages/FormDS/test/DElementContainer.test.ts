import {factory, DElementContainer} from "../src/lib";

test("CONTAINER001: add elements", ()=>{

    let container = new DElementContainer();

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.rows.length).toBe(5)

})

test("CONTAINER002: clone one element", ()=>{

    let container = new DElementContainer();
    
    const newElemt = factory.makeObject("Textbox");
    container.addElements([newElemt]);

    container.elementAt(0,0).smaller()
    container.elementAt(0,0).smaller()
    container.elementAt(0,0).smaller()

    
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    

    expect(container.rows.length).toBe(1)
})

test("CONTAINER003: clone one element row overflow", ()=>{

    let container = new DElementContainer();
    
    const newElemt = factory.makeObject("Textbox");
    container.addElements([newElemt]);

    container.elementAt(0,0).smaller()
    container.elementAt(0,0).smaller()
    container.elementAt(0,0).smaller()

    
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    container.clone(container.elementAt(0,0))
    

    expect(container.rows.length).toBe(2)
})

test("CONTAINER004: remove elements ", ()=>{

    let container = new DElementContainer();

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.rows.length).toBe(5)

    container.remove(container.elementAt(2,0))

    expect(container.rows.length).toBe(4)

   // container.remove(container.rows[1][0])
    container.remove(container.elementAt(1,0))

    expect(container.rows.length).toBe(3)

    //container.remove(container.rows[1][0])
    container.remove(container.elementAt(1,0))

    expect(container.rows.length).toBe(2)

    //container.remove(container.rows[1][0])
    container.remove(container.elementAt(1,0))

    expect(container.rows.length).toBe(1)

    //container.remove(container.rows[0][0])
    container.remove(container.elementAt(0,0))

    expect(container.rows.length).toBe(0)

})

test("CONTAINER005: remove element from row with multiple elements ", ()=>{

    let container = new DElementContainer();

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.rows.length).toBe(5)

    //container.rows[1][0].smaller()
    container.elementAt(1,0).smaller()
    //container.rows[1][0].smaller()
    container.elementAt(1,0).smaller()

    expect(container.clone(container.elementAt(1,0)))

    expect(container.rows.length).toBe(5)

    expect(container.rows[1].length()).toBe(2)

})

test("CONTAINER006: drag last element upwards ", ()=>{

    let container = new DElementContainer();

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.rows.length).toBe(5)

    //container.rows[1][0].smaller()
    container.elementAt(1,0).smaller()
    container.elementAt(1,0).smaller()

    //container.rows[4][0].smaller()
    container.elementAt(4,0).smaller()
    //container.rows[4][0].smaller()
    container.elementAt(4,0).smaller()

    
    container.printPicture();

    const elmnt = container.elementAt(4,0)
    //container.rows[4].elements.splice(0,1)
    container.rows[4].removeElementAt(0)

    
    container.rows[1].push(elmnt)


    container.normalize_elements();

    container.printPicture();

    expect(container.rows.length).toBe(4)


})

test("CONTAINER007: clone element eventually causing row overflow ", ()=>{

    let container = new DElementContainer();

    for(let i=0;i<5;i++){
        const newElemt = factory.makeObject("Textbox");
        container.addElements([newElemt]);
    }

    expect(container.rows.length).toBe(5)

   // container.rows[1][0].smaller()
    container.elementAt(1,0).smaller()
    container.elementAt(1,0).smaller(); // width = 50%

    container.clone(container.elementAt(1,0));
    container.clone(container.elementAt(1,0))
    

    expect(container.rows.length).toBe(6)
    
})