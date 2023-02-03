import {classToPlain, TransformationType} from "class-transformer";
import {Transform} from "class-transformer";
import factory from './Factory';

export default function ElementTX()
{
    return Transform(({value, type}) => {
        if( type == TransformationType.CLASS_TO_PLAIN)
        {
            return classToPlain(value)
        }
        else
        {
            return factory.makeFromPlainObject(value)
        }
    })
}