import DFormElement from "./DFormElement";
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import {SimpleFileUploadValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

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


    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})

        if(this.hasLabel()){
            container
              .startTag('label', {class: sidekick.css.labelClasses(), for: this.name })
              .html(this.label);
        }
        
        const attrs:Attributes = {
            type:'file', 
            class: sidekick.css.inputClasses(),
            name:this.name,
            id:this.name,
        }

        if(this.validations.required.enabled){
            attrs['required'] = 'required'
        }
       
        container.startTag('input',attrs)

    }
}