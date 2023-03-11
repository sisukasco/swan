import DItem, {itemsFromText, getTextFromItems, getItemsJSON} from '../src/modules/DItem';

test("items001: Set Items from plain text", ()=>
{
    const text = `
    
    Item 1
    Item 2
    Item 3


    Item 4
    
    `

    const items = itemsFromText(text)

    expect(items.length).toBe(4)
    expect(items[0].name).toBe("Item 1") 
    expect(items[0].value).toBe("Item 1") 

    expect(items[1].name).toBe("Item 2") 
    expect(items[1].value).toBe("Item 2") 

    expect(items[2].name).toBe("Item 3") 
    expect(items[2].value).toBe("Item 3") 

    expect(items[3].name).toBe("Item 4") 
    expect(items[3].value).toBe("Item 4")     
        
})


test("items002: Set Items from JSON ", ()=>
{
    const text = `
    
    [
        {"name":"Item 1", "value":"Item 1"},

        {"name":"Item 2", "value":"Item 2"},

        {"name":"Item 3", "value":"Item 3"},

        {"name":"Item 4", "value":"Item 4"}
    ]
    
    
    `

    const items = itemsFromText(text)
    
    expect(items.length).toBe(4)
    expect(items[0].name).toBe("Item 1") 
    expect(items[0].value).toBe("Item 1") 

    expect(items[1].name).toBe("Item 2") 
    expect(items[1].value).toBe("Item 2") 

    expect(items[2].name).toBe("Item 3") 
    expect(items[2].value).toBe("Item 3") 

    expect(items[3].name).toBe("Item 4") 
    expect(items[3].value).toBe("Item 4") 
    
    const textRes = getTextFromItems(items)

    const resArr = textRes.split(/\r?\n/)
                .map( (itm:string)=>(itm.trim()))

    expect(resArr[0]).toBe("Item 1")
    expect(resArr[1]).toBe("Item 2")
    expect(resArr[2]).toBe("Item 3")
        
})

test("items003: Set Items from JSON ", ()=>
{
    const text = `
    [
        {"name":"item 1", "value":"value 1"},

        {"name":"item 2", "value":"value 2"},

        {"name":"item 3", "value":"value 3"},

        {"name":"item 4", "value":"value 4"}
    ]
    
    
    `

    const items = itemsFromText(text)
    
    expect(items.length).toBe(4)
    expect(items[0].name).toBe("item 1") 
    expect(items[0].value).toBe("value 1") 

    expect(items[1].name).toBe("item 2") 
    expect(items[1].value).toBe("value 2") 

    expect(items[2].name).toBe("item 3") 
    expect(items[2].value).toBe("value 3") 

    expect(items[3].name).toBe("item 4") 
    expect(items[3].value).toBe("value 4")  
    
    const textRes = getTextFromItems(items)

    const resObj = JSON.parse(textRes)

    expect(resObj.length).toBe(4)
    expect(resObj[0].name).toBe("item 1") 
    expect(resObj[0].value).toBe("value 1") 
})


test("items004: Set Items from JSON ", ()=>
{
    const text = `
    [
        {"name":"Item 1", "value":"Item  1"},
        {"name":"Item 2", "value":"Item 2"},

        {"name":"Item 3", "value":"Item 3"},

        {"name":"Item 4", "value":"Item 4"}
    ]
    `

    const items = itemsFromText(text)
    
    
    const textRes = getTextFromItems(items)
    const resObj =JSON.parse(textRes)
    expect(resObj.length).toBe(4)
    expect(resObj[0].name).toBe("Item 1") 
    expect(resObj[0].value).toBe("Item  1") 
        
})

test("items005: Set Items from plain text", ()=>
{
    const text = `
    
    Item 1
    Item 2
    Item 3


    Item 4
    
    `

    const items = itemsFromText(text)

    const resRet = getItemsJSON(items)


    const retObjs = JSON.parse(resRet)

    expect(retObjs.length).toBe(4)
    expect(retObjs[0].name).toBe("Item 1") 
    expect(retObjs[0].value).toBe("Item 1")

    expect(retObjs[0].rvalue).toBeUndefined()
})

test("items006: when items not complex", ()=>
{
    const items:DItem[] = [];
    items.push(new DItem("item1","item1"));
    items.push(new DItem("item2","item2"))
    items.push(new DItem("item3","item3"))
    items.push(new DItem("item4","item4"))

    const txtItems = getTextFromItems(items)

    const itms = txtItems.split(/\r?\n/)
    .map( (itm:string)=>(itm.trim()))

    expect(itms[0]).toBe("item1")
    expect(itms[1]).toBe("item2")
    expect(itms[2]).toBe("item3")
    expect(itms[3]).toBe("item4")

})

test("items007: when items get complex with rvalue", ()=>
{
    const items:DItem[] = [];
    items.push(new DItem("item1","item1"));
    items.push(new DItem("item2","item2"))
    items.push(new DItem("item3","item3"))
    items.push(new DItem("item4","item4"))

    items[1].rvalue="1"

    const txtItems = getTextFromItems(items)

    console.log("txtItems ", txtItems)

    const jsonItems = JSON.parse(txtItems)

    expect(jsonItems[0].name).toBe("item1")
    expect(jsonItems[0].value).toBe("item1")
    expect(jsonItems[0].rvalue).toBeUndefined()

    expect(jsonItems[1].name).toBe("item2")
    expect(jsonItems[1].value).toBe("item2")
    expect(jsonItems[1].rvalue).toBe("1")  
    
    expect(jsonItems[2].name).toBe("item3")
    expect(jsonItems[2].value).toBe("item3")
    expect(jsonItems[2].rvalue).toBeUndefined()

})

test("rvalue: JSON with rvalue", ()=>
{
    const text = `
    [
        {"name":"Item 1", "value":"Item  1", "rvalue":"1" },
        {"name":"Item 2", "value":"Item 2", "rvalue":"2"},

        {"name":"Item 3", "value":"Item 3", "rvalue":"3"},

        {"name":"Item 4", "value":"Item 4"}
    ]
    `

    const items = itemsFromText(text)
    
    expect(items[0].rvalue).toBe("1")
    expect(items[1].rvalue).toBe("2")
    expect(items[2].rvalue).toBe("3")
    expect(items[3].rvalue).toBe("")
    
    const textRes = getTextFromItems(items)
    const resObj =JSON.parse(textRes)
    expect(resObj.length).toBe(4)
    expect(resObj[0].name).toBe("Item 1") 
    expect(resObj[0].value).toBe("Item  1")
    expect(resObj[0].rvalue).toBe("1") 

    expect(resObj[1].name).toBe("Item 2") 
    expect(resObj[1].value).toBe("Item 2")
    expect(resObj[1].rvalue).toBe("2")     
        
})

