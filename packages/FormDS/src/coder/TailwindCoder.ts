import {CSSFramework} from "./CSSFramework"

export class TailWindCoder implements CSSFramework{
    private numColumns:number=2;
    private breakPoint:string="md";

    setNumColumns(n:number){
        this.numColumns = n
    }

    layoutContainerClasses():string[]{
        return ['container mx-auto']
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

    textAlignmentClasses(alignment:string):string[]{
        if (alignment == "center") {
            return ["text-center"]
        }
        else if (alignment == "right") {
            return ["text-right"]
        }
        return []
    }

    hintTextClasses():string[]{
        return ['text-xs','text-gray-500']
    }

    headingClasses(type:string):string[]{
        const classes=[]
        switch(type){
            case 'h1':
                classes.push("text-3xl")
                break;
            case 'h2':
                classes.push("text-2xl")
                break;
            case 'h3':
                classes.push("text-xl")
                break;
            case 'h4':
                classes.push("text-lg")
                break;                       
        }
        return classes;
    }
    flexAlignmentClasses(alignment:string):string[]{
        const classes=["flex", "items-center"]
        if (alignment == "center") {
            classes.push("justify-center")
        }
        else if (alignment == "right") {
            classes.push("justify-end")
        }
        return classes
    }
    buttonClasses():string[]{
        return ['px-6', 'py-2', 'rounded', 'shadow'];
    }

    groupContainerClasses(arrangement:string):string[]{
        if(arrangement == 'horizontal'){
            return ["flex", "flex-wrap"]
            
        }else{
            return ["space-y-1"]
        }
    }

    groupItemContainerClasses(arrangement:string):string[]{
        let classes:string[] = ["flex" ,"items-center"]
        if(arrangement == 'horizontal'){
            classes.push("mr-3")
        }

        return classes;
    }
    inputCheckboxClasses():string[]{
        return []
    }
    labelCheckboxClasses():string[]{
        return ['pl-1']
    }
    selectFieldClasses():string[]{
        return ["w-full"]
    }
}