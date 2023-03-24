import {CSSFramework} from "./CSSFramework"

export class TailWindCoder implements CSSFramework{
    private numColumns:number=2;
    private breakPoint:string="md";

    setNumColumns(n:number){
        this.numColumns = n
    }

    inputContainerClasses(width:number){

        let colx="";

        if(this.numColumns == 2){
            if(width <= 50){
                colx = "w-1/2";
            }
        } else if(this.numColumns == 3){
            if(width <= 33){
                colx = "w-1/3";
            } else if(width <= 66){
                colx = "w-2/3";
            }
        } else if(this.numColumns == 4){
            if (width <= 25) {
                colx = 'w-1/4'
            }
            else if (width <= 50) {
                colx = 'w-1/2'
            }
            else if (width <= 75) {
                colx = 'w-3/4'
            }
        }
        
        const ret =["w-full"]
        if(colx){
            colx = this.breakPoint+':'+colx
            ret.push(colx)
        }
        
        return ret;
    }

    labelClasses():string[]{
        return ["block"]
    }
    inputClasses():string[]{
        return ["w-full"]
    }

    rowClasses():string[]{
        return ['flex', 'mb-4','space-x-4']
    }

}