import $ from "@sisukas/jquery";
import {DFormElement} from "@sisukas/form-ds";
import {TextboxParser} from "./TextboxParser";
import {EmailFieldParser} from "./EmailFieldParser";
import {NumberFieldParser} from "./NumberFieldParser";
import {DropDownParser} from "./DropDownParser";
import {CheckboxParser} from "./CheckboxParser";
import {CheckboxGroupParser} from "./CheckboxGroupParser";
import {RadioGroupParser} from "./RadioGroupParser";
import {HiddenFieldParser} from "./HiddenFieldParser";
import {FileInputParser} from "./FileInputParser";
import {RangeFieldParser} from "./RangeFieldParser";
import {ColorFieldParser} from "./ColorFieldParser";
import {DateFieldParser} from "./DateFieldParser";
import {DateTimeParser} from "./DateTimeParser";
import {PasswordFieldParser} from "./PasswordFieldParser";

import {parseElementName, parseElementType} from "./BaseElementParser";
import { serialize } from '@sisukas/form-ds';
import { PhoneFieldParser } from './PhoneFieldParser';
import { URLFieldParser } from './URLFieldParser';
import { MultilineParser } from './MultilineParser';

/*

Select ->
 Allowed values ?
 
Type validations
  tel
  email
  url
  number
  
html5 Validations
required
maxlegth
minlength
pattern attribute
min -> for type=number or range or for date picker 
max

Dataset and auto-suggestion HTML5 feature 

## Server side options
select field - limit values to the options

datetime/date field - validations

textfield -> allow input from a list only -> example: coupon code, simple captcha, 
allowed zip codes 

*/

export type ParsedFormSettings={
    fields: DFormElement[]
}

type FieldMapInternal={
    [name:string]:DFormElement;
}

export class FormParser{
    private field_map:FieldMapInternal={}
    
    constructor(private form:HTMLFormElement)
    {
    }
    
    public parse():ParsedFormSettings
    {
        $("input,select,textarea",this.form).each((i:number,e:HTMLElement)=>{
            
            if(!this.hasField(parseElementName(e)) )
            {
                const field = this.parseField(e, i+1);
                if(field != null)
                {
                    this.addField(field);        
                }
            }
        });
        
       return this.makeFormSettings();
    }
    
    public parseField(e:HTMLElement, pos:number):DFormElement|null
    {
       const type = parseElementType(e);
       if(!type)
       {
           return null;
       }
       let parser=null;
       switch(type)
       {
            case "CheckboxGroup":
                parser = new CheckboxGroupParser(e);
                break;
                
            case "Checkbox":
                parser = new CheckboxParser(e);
                break;
                
            case "Color":
                parser = new ColorFieldParser(e);
                break;
                
            case "Date":
                parser = new DateFieldParser(e);
                break;
                
            case "DateTime":
                parser = new DateTimeParser(e);
                break;
                
            case "DropDown":
                parser = new DropDownParser(e);
                break; 
                
            case "Email":
                parser = new EmailFieldParser(e);
                break; 
                
            case "File":
                parser = new FileInputParser(e);
                break;
            
            case "Multiline":
                parser = new MultilineParser(e);
                break;
                
            case "Hidden":
                parser = new HiddenFieldParser(e);
                break; 
                
            case "Number":
                parser = new NumberFieldParser(e);
                break;
                
            case "Phone":
                parser = new PhoneFieldParser(e);
                break;   
                                            
            case "RadioGroup":
                parser = new RadioGroupParser(e);
                break;
                
            case "Range":
                parser = new RangeFieldParser(e);
                break;
            
            case "Textbox":
                parser = new TextboxParser(e);
                break;
                
            case "URL":
                parser = new URLFieldParser(e);
                break;
                
            case "Password":
                parser = new PasswordFieldParser(e);
                break;
       }
       
       if(!parser)
       {
           return null;
       }
       
       const field = parser.parse();
       if(null !== field)
       {
        field.pos = pos;
       }
       return field;
    }
    
    public addField(field:DFormElement)
    {
        if(this.hasField(field.name) || 
          field.name.length <= 0){ return }
            
         this.field_map[field.name] = field
    }
    
    public hasField(name:string)
    {
        return((name in this.field_map)?true:false);
    }
    
    
    public makeFormSettings()
    {
        let fs:ParsedFormSettings={
            fields: []
        }
        for(let name in this.field_map)
        {
            fs.fields.push(this.field_map[name]);
        }  
          
        return fs;
    }
}

export function parseFormSettings(form:HTMLFormElement):string
{
    const fp = new FormParser(form);
    const fs = fp.parse();
    return serialize(fs)
}