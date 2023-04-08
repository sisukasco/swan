import faker from "faker"
import $ from "@sisukas/jquery";
import {FormParser} from "../src/FormParser";
import { serialize } from '@sisukas/form-ds';

test("FORM100: parsing a simple form",()=>
{
    document.body.innerHTML =`
    <form id="myform">
        <div >
            <label for="name_field">Email address</label>
            <input type="text" required class="form-control" 
            id="name_field" name="name" >
        </div>
        <div >
            <label for="email_field">Email address</label>
            <input type="text" required class="form-control" 
            id="email_field" name="email" >
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
  const form = <HTMLFormElement>$("#myform")[0]
  const fp = new FormParser(form);
  const fs = fp.parse()
  expect(fs.fields[0].name).toBe("name")
  expect(fs.fields[0].type).toBe("Textbox")
  expect(fs.fields[1].name).toBe("email")
  expect(fs.fields[1].type).toBe("Textbox")
  console.log("form settings ", serialize(fs))
  
})

test("FORM101: parsing a form with email and number field",()=>
{
    document.body.innerHTML =`
    <form id="myform">
        <div >
            <label for="name_field">Email address</label>
            <input type="text" required class="form-control" 
            id="name_field" name="name" >
        </div>
        <div >
            <label for="email_field">Email address</label>
            <input type="email" required class="form-control" 
            id="email_field" name="email" >
        </div>
        <div >
            <label for="age_field">Age</label>
            <input type="number" required min="18" class="form-control" 
            id="age_field" name="age" >
        </div>        
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
  const form = <HTMLFormElement>$("#myform")[0]
  const fp = new FormParser(form);
  const fs = fp.parse()
  expect(fs.fields[0].name).toBe("name")
  expect(fs.fields[0].type).toBe("Textbox")
  expect(fs.fields[1].name).toBe("email")
  expect(fs.fields[1].type).toBe("Email")
  
  expect(fs.fields[2].type).toBe("Number")
  expect(fs.fields[2].name).toBe("age")
  console.log("form settings ", serialize(fs))
  
})

test("FORM102: parsing a form with email and number field",()=>
{
    document.body.innerHTML =`
<div class="container">
        <h1>Sample Form</h1>
        <form id="myform" name="myform" method="post" >
            <div class="form-group">
              <label for="email_addr">Email address</label>
              <input type="email" required maxlength="50" class="form-control" 
              id="email_addr" name="email" placeholder="name@example.com">
            </div>
            <div class="form-group">
              <label for="name_input">Name</label>
              <input type="name" required maxlength="50" class="form-control" 
              id="name_input" name="name" placeholder="Name">
            </div>            
            <div class="form-group">
              <label for="quantity">Select Quantity</label>
              <select class="form-control" name="quantity" id="quantity">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea class="form-control" id="message" name="message" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          
    </div>
`;

    const form = <HTMLFormElement>$("#myform")[0]
    const fp = new FormParser(form);
    const fs = fp.parse();
    
    console.log("form settings ", serialize(fs))

})

test("FORM103: parsing checkbox group from form",()=>
{
    const cg_name = faker.random.word()
    const direct_name =  cg_name + "[]"
    
    const direct_name2 = faker.random.word() 
    
    document.body.innerHTML =`
    <form id="myform">
    <div>
    <label for="chkbox1">Option 1</label>
    <input type="checkbox" value="v1" name="${direct_name}" id="chkbox1"/>
    </div>
    <div>
    <label for="chkbox2">Option 2</label>
    <input type="checkbox"  value="v2" name="${direct_name}" id="chkbox2"/>    
    </div>
    <div>
    <label for="chkbox3">Option 3</label>
    <input type="checkbox"  value="v3" name="${direct_name}" id="chkbox3"/>        
    </div>
    <div>
    <label for="chkbox4">Option 4</label>
    <input type="checkbox"  value="v4" name="${direct_name}" id="chkbox4"/>        
    </div>
    <div>
    <label for="singlecheckbox">Agree?</label>
    <input type="checkbox"  value="on" name="${direct_name2}" id="singlecheckbox"/>        
    </div>    
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const fp = new FormParser(form);
    const fs = fp.parse();
    expect(fs.fields[0].type).toBe("CheckboxGroup")
    expect(fs.fields[0].name).toBe(cg_name)
    
    expect(fs.fields[1].name).toBe(direct_name2)
    expect(fs.fields[1].type).toBe("Checkbox")
    
    console.log("checkbox group form ", serialize(fs))
})

test("FORM104: parsing radio group from form",()=>
{
    const rg_name = faker.random.word()
    const direct_name =  rg_name
    
    const direct_name2 = faker.random.word() 
    
    document.body.innerHTML =`
    <form id="myform">
    <div>
    <label for="radio1">Option 1</label>
    <input type="radio" value="v1" name="${direct_name}" id="radio1"/>
    </div>
    <div>
    <label for="radio2">Option 2</label>
    <input type="radio"  value="v2" name="${direct_name}" id="radio2"/>    
    </div>
    <div>
    <label for="radio3">Option 3</label>
    <input type="radio"  value="v3" name="${direct_name}" id="radio3"/>        
    </div>
    <div>
    <label for="radio4">Option 4</label>
    <input type="radio"  value="v4" name="${direct_name}" id="radio4"/>        
    </div>  
    <div>
    <label for="singlecheckbox">Agree?</label>
    <input type="checkbox"  value="on" name="${direct_name2}" id="singlecheckbox"/>        
    </div>       
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const fp = new FormParser(form);
    const fs = fp.parse();
    expect(fs.fields[0].type).toBe("RadioButton")
    expect(fs.fields[0].name).toBe(rg_name)
    
    expect(fs.fields[1].name).toBe(direct_name2)
    expect(fs.fields[1].type).toBe("Checkbox")
    
    console.log("Radio group form ", serialize(fs))
})

test("FORM105: parsing a simple form",()=>
{
    const value = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
        <input type="hidden"  
        id="hidden_field" name="settings" value="${value}" >
        <div >
            <label for="name_field">Email address</label>
            <input type="text" required class="form-control" 
            id="name_field" name="name" >
        </div>
    </form>
    `
    const form = <HTMLFormElement>$("#myform")[0];
    const fp = new FormParser(form);
    const fs = fp.parse();
    expect(fs.fields[0].type).toBe("HiddenField")
    expect(fs.fields[0].name).toBe("settings")
    
})

test("FORM106: parsing file input field",()=>
{
    document.body.innerHTML =`
    <form id="myform">
        <div >
            <label for="photo_field">Your photo</label>
            <input type="file" required  
            id="photo_field" name="photo" >
        </div>
        <div >
            <label for="email_field">Email address</label>
            <input type="text" required class="form-control" 
            id="email_field" name="email" >
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
  const form = <HTMLFormElement>$("#myform")[0]
  const fp = new FormParser(form);
  const fs = fp.parse()
  expect(fs.fields[0].name).toBe("photo")
  expect(fs.fields[0].label).toBe("Your photo")
  expect(fs.fields[0].type).toBe("SimpleFileUpload")
  console.log("form settings ", serialize(fs))
  
})

test("FORM107: parsing multiline field",()=>
{
    document.body.innerHTML =`
    <form id="myform">
        <div >
            <label for="name_field">Your Name</label>
            <input type="text"  
            id="name_field" name="name" >
        </div>
        <div >
            <label for="msg_field">Message</label>
            <textarea id="msg_field" name="message" ></textarea> 
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
  const form = <HTMLFormElement>$("#myform")[0]
  const fp = new FormParser(form);
  const fs = fp.parse()
  expect(fs.fields[0].name).toBe("name")
  expect(fs.fields[0].label).toBe("Your Name")
  
  expect(fs.fields[1].name).toBe("message")
  expect(fs.fields[1].label).toBe("Message")
  expect(fs.fields[1].type).toBe("Multiline")
  
  console.log("form settings ", serialize(fs))
  
})

test("FORM108: parsing date and datetime field",()=>
{
    document.body.innerHTML =`
    <form id="myform">
        <div >
            <label for="name_field">Your Name</label>
            <input type="text"  
            id="name_field" name="name" >
        </div>
        <div >
            <label for="date_field">Date 1</label>
            <input type="date"  
            id="date_field" name="date_1" >
        </div> 
        <div >
            <label for="date_field2">Date 2</label>
            <input type="datetime-local"  
                id="date_field2" name="date_2" >
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
  const form = <HTMLFormElement>$("#myform")[0]
  const fp = new FormParser(form);
  const fs = fp.parse()
  expect(fs.fields[0].name).toBe("name")
  expect(fs.fields[0].label).toBe("Your Name")
  
  expect(fs.fields[1].name).toBe("date_1")
  expect(fs.fields[1].label).toBe("Date 1")
  expect(fs.fields[1].type).toBe("Date")
  
  expect(fs.fields[2].name).toBe("date_2")
  expect(fs.fields[2].label).toBe("Date 2")
  expect(fs.fields[2].type).toBe("DateTime")
  
  console.log("form settings ", serialize(fs))
  
})


test("FORM109: parsing color field",()=>
{
    document.body.innerHTML =`
    <form id="myform">
        <div >
            <label for="color_field">Pick Color</label>
            <input type="color"  
            id="color_field" name="col" >
        </div>
        <div >
            <label for="weight_field">Weight</label>
            <input type="range"  
            id="weight_field" name="weight" >
        </div> 
        <div >
            <label for="url_field">URL</label>
            <input type="url"  
                id="url_field" name="site_addr" >
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
  const form = <HTMLFormElement>$("#myform")[0]
  const fp = new FormParser(form);
  const fs = fp.parse()
  expect(fs.fields[0].name).toBe("col")
  expect(fs.fields[0].label).toBe("Pick Color")
  
  expect(fs.fields[1].name).toBe("weight")
  expect(fs.fields[1].label).toBe("Weight")
  expect(fs.fields[1].type).toBe("Range")
  
  expect(fs.fields[2].name).toBe("site_addr")
  expect(fs.fields[2].label).toBe("URL")
  expect(fs.fields[2].type).toBe("URL")
  
  console.log("form settings ", serialize(fs))
  
})


test("FORM110: parsing password field",()=>
{
    document.body.innerHTML =`
    <form id="myform">
        <div >
            <label for="password_field">Password</label>
            <input type="password"  
            id="password_field" name="password" >
        </div>
        <div >
            <label for="weight_field">Weight</label>
            <input type="range"  
            id="weight_field" name="weight" >
        </div> 
        <div >
            <label for="url_field">URL</label>
            <input type="url"  
                id="url_field" name="site_addr" >
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
  const form = <HTMLFormElement>$("#myform")[0]
  const fp = new FormParser(form);
  const fs = fp.parse()
  expect(fs.fields[0].type).toBe("Password")
  expect(fs.fields[0].name).toBe("password")
  expect(fs.fields[0].label).toBe("Password")
  

  
  console.log("form settings ", serialize(fs))
  
})