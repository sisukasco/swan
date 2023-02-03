'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";


class DImage extends DElement
{
    public alt_text:string = ''
    public settings ={
        imageData:'',
        image_size:
        {
            width:0,
            height:0
        }
    }
    constructor()
    {
        super('Image');
    }
    public code(coder:NodeItem)
    {
        coder.startTag('div')
        .startTag('img', 
        {src:this.settings.imageData, style:this.settings.image_size,alt:this.alt_text});
        
    }
   
} 

export default DImage;