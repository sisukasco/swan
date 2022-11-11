import DFormElement from "./DFormElement";
import {NodeItem} from "@sisukas/coder-interface";
import {SimpleFileUploadValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { ExcludeDefault } from '@sisukas/base-runtime';

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
        const container = coder.section('form.input.container');
        container.section('form.input.label', 
        {'for':this.name}).html(this.label);

        container.startTag("simple-file-upload",
        {
            name:this.name
        }).text(this.settings.button_label);
        
        container.section('form.input.error',{name:this.name});
        
        coder.createCodeBlock('simple-file-upload',
        `this["@sisukas/aves"].registerSimpleFileUploadComponent(Vue);`);

        coder.addDependency('aves','http://cdn.dollarforms.io/scripts/aves/1.0.0','script');
    }
}