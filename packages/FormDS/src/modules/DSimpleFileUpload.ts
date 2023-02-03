import DFormElement from "./DFormElement";
import {NodeItem} from "@sisukas/coder-interface";
import {SimpleFileUploadValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { ExcludeDefault } from "../lib/TxUtils";
import {InputAttributes } from "./attribs";

class FileUploadSettings
{
    @ExcludeDefault('Select File')
    public button_label = 'Select File'
    
    @ExcludeDefault(false)
    public multiple:boolean=false
}

export default class DSimpleFileUpload extends DFormElement
{
    @Type(()=>FileUploadSettings)
    public settings = new FileUploadSettings();

    constructor()
    {
        super('SimpleFileUpload', 'File:');
    }

    @Type(()=>SimpleFileUploadValidations)
    public readonly  validations:SimpleFileUploadValidations = new SimpleFileUploadValidations;


    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container', { width: this.width});

        container.section('form.input.label', {'for':this.name}).html(this.label);
        
        const attrs:InputAttributes = {
            type:'file', 
            name:this.name,
            id:this.name,
        }

        if(this.validations.required.enabled){
            attrs['required'] = 'required'
        }
       
        container.section('form.input.input',attrs);

        container.section('form.input.error',{name:this.name});

    }
}