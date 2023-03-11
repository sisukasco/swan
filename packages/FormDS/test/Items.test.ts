import {itemsFromText, getTextFromItems, getItemsJSON} from '../src/modules/DItem';

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
})