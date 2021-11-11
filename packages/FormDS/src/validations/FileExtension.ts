import FormValidation from "./FormValidation";

export default class FileExtension extends FormValidation
{
    public valid_extensions:string='';

    public is_enabled()
    {
        return(this.valid_extensions?true:false);
    }
    public get short_name():string
    {
        return('extension: '+this.valid_extensions);
    }
    public getCode()
    {
        return (`hasExtension("${this.valid_extensions}")`);
    }
    public get_class_name()
    {
        return "file_extension";
    }
}