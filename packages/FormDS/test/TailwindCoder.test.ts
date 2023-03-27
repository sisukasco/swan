import { TailWindCoder } from "../src/coder/TailwindCoder"

describe('TailWindCoder', () => {
    let tailWindCoder: TailWindCoder;

    beforeEach(() => {
        tailWindCoder = new TailWindCoder();
    });

    test('TW001: inputContainerClasses with 2 columns', () => {
        tailWindCoder.setNumColumns(2);
        expect(tailWindCoder.inputContainerClasses(50)).toEqual(['w-full', 'md:w-1/2']);
        expect(tailWindCoder.inputContainerClasses(100)).toEqual(['w-full']);
    });

    test('TW002: inputContainerClasses with 3 columns', () => {
        tailWindCoder.setNumColumns(3);
        expect(tailWindCoder.inputContainerClasses(33)).toEqual(['w-full', 'md:w-1/3']);
        expect(tailWindCoder.inputContainerClasses(66)).toEqual(['w-full', 'md:w-2/3']);
        expect(tailWindCoder.inputContainerClasses(99)).toEqual(['w-full']);
        expect(tailWindCoder.inputContainerClasses(100)).toEqual(['w-full']);
    });

    test('TW003: inputContainerClasses with 4 columns', () => {
        tailWindCoder.setNumColumns(4);
        expect(tailWindCoder.inputContainerClasses(25)).toEqual(['w-full', 'md:w-1/4']);
        expect(tailWindCoder.inputContainerClasses(50)).toEqual(['w-full', 'md:w-1/2']);
        expect(tailWindCoder.inputContainerClasses(75)).toEqual(['w-full', 'md:w-3/4']);
        expect(tailWindCoder.inputContainerClasses(100)).toEqual(['w-full']);
    });
});
