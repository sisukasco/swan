import $ from "@sisukas/jquery";


export function parseElementName(e:HTMLElement)
{
    let name = $(e).attr("name") ?? "";
    
    if(!name)
    {
        name = $(e).attr("id") ?? "";
    }
    let m = name.match(/(.+?)((\[\s*\])+)$/)
    if(m && m.length >= 2){ 
        name=m[1]
    }
    return name
}

function isArray(e:HTMLInputElement)
{
    if(e.form == null){ return false; }
    return($(`[name="${e.name}"]`, e.form).length > 1 ? true:false)
}
export function parseElementType(e:HTMLElement)
{
    let tag = $(e).prop("tagName");
    let type =""
    if(tag == "INPUT")
    {
        const typeMap:Record<string, string> ={
            text: "Textbox",
            number: "Number",
            email: "Email",
            hidden: "Hidden",
            file: "File",
            tel: "Phone",
            url: "URL",
            range: "Range",
            color: "Color",
            date: "Date",
            "datetime-local": "DateTime",
        }
        //default type is text if none of the types match
        type = "Textbox";
        let t = $(e).attr("type");
        if(t)
        {
            t = t.toLowerCase()    
            if(t in typeMap)
            {
                type = typeMap[t];
            }
            else if(t == "checkbox")
            {
                if(isArray(<HTMLInputElement>e))
                {
                    type = "CheckboxGroup"
                }
                else
                {
                    type = "Checkbox"
                }
            }
            else if(t == "radio")
            {
                type = "RadioGroup"
            }
        }
    }
    else if(tag=="SELECT")
    {
        type="DropDown"
    }
    else if(tag=="TEXTAREA")
    {
        type="Multiline"
    }
    return type;
}

//TODO: break this BaseElementParser to a set of functions
export class BaseElementParser
{
    protected $e:JQuery<HTMLElement>;
    protected form:HTMLFormElement;
    
    constructor(protected e:HTMLElement)
    {
        let form = (<HTMLInputElement>e).form
        if(form == null)
        {
            throw new Error("form is null for the element")
        }
        this.form =form
        this.$e = $(e)
    }
    
    protected getName()
    {
        let name = this.$e.attr("name") ?? "";
        
        if(!name)
        {
            name = this.$e.attr("id") ?? "";
        }
        let m = name.match(/(.+?)((\[\s*\])+)$/)
        if(m && m.length >= 2){ 
            name=m[1]
        }
        return name
    }
    
    protected getValue()
    {
        return this.$e.attr("value") ?? "";
    }
    
    protected getLabel()
    {//TODO: use fieldset->legend for a group of elements
     // like radio groups
     // https://stackoverflow.com/a/13273907
     
        //source: https://stackoverflow.com/a/13357474
        var $label = $("label[for='" + this.$e.attr('id')+"']")
        if ($label.length == 0) {
          $label = this.$e.closest('label')
        }
     
        let txt=""
        if ($label.length > 0) 
        {
            txt = $label.text()
        }
        return txt.trim()
    }
    
    protected isRequired()
    {
        var attr = this.$e.attr('required');
        if (typeof attr !== typeof undefined ) {
            return true;
        }
        return false;
    }
    
    protected getMax()
    {
        var attr = this.$e.attr('max');
        
        if (attr === undefined )
        {
            return null;
        }
        return parseInt(attr, 10);
    }
    
    protected getMin()
    {
        var attr = this.$e.attr('min');
        
        if (attr === undefined )
        {
            return null;
        }
        return parseInt(attr, 10);
    }
    
    protected getStep()
    {
        var attr = this.$e.attr('step');
        
        if (attr === undefined )
        {
            return null;
        }
        return parseInt(attr, 10);
    }
    
    protected getMinDate()
    {
        var attr = this.$e.attr('min');
        
        if (attr === undefined )
        {
            return null;
        }
        return attr;
    }
    
    protected getMaxDate()
    {
        var attr = this.$e.attr('max');
        
        if (attr === undefined )
        {
            return null;
        }
        return attr;
    }
    
    protected getMaxLength()
    {
        var attr = this.$e.attr('maxlength');
        
        if (attr === undefined )
        {
            return null;
        }
        return parseInt(attr, 10);
    }
    
    protected getMinLength()
    {
        var attr = this.$e.attr('minlength');
        
        if (attr === undefined )
        {
            return null;
        }
        return parseInt(attr, 10);
    }
    
    protected getPatternValidation()
    {
        var attr = this.$e.attr('pattern');
        if (attr === undefined )
        {
            return "";
        }
        return attr;
    }
    
}