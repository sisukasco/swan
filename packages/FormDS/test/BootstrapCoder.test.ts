import { BootstrapCoder } from "../src/coder/BootstrapCoder";

describe('BootstrapCoder', () => {
  let bootstrapCoder: BootstrapCoder;

  beforeEach(() => {
    bootstrapCoder = new BootstrapCoder();
  });

  describe('inputContainerClasses', () => {

    test('BOOTW001: should return "col" when width is not provided', () => {
      const result = bootstrapCoder.inputContainerClasses(0);
      expect(result).toEqual(['col']);
    });

    test('BOOT002: width classes',()=>
    {
        bootstrapCoder.setNumColumns(4);

        const classes  = bootstrapCoder.inputContainerClasses(25)
        expect(classes).toEqual(["col-md-3"]);
    })

    test('BOOTW003: should return correct classes based on numColumns and width', () => {
      const testCases = [
        { numColumns: 1, width: 100, expected: ['col-md-12'] },
        { numColumns: 2, width: 50, expected: ['col-md-6'] },
        { numColumns: 3, width: 33, expected: ['col-md-4'] },
        { numColumns: 3, width: 66, expected: ['col-md-8'] },
        { numColumns: 3, width: 99, expected: ['col-md-12'] },
        { numColumns: 3, width: 100, expected: ['col-md-12'] },
        { numColumns: 4, width: 25, expected: ['col-md-3'] },
        { numColumns: 4, width: 50, expected: ['col-md-6'] },
        { numColumns: 4, width: 75, expected: ['col-md-9'] },
        { numColumns: 4, width: 100, expected: ['col-md-12'] },
      ];

      testCases.forEach((testCase) => {
        bootstrapCoder.setNumColumns(testCase.numColumns);
        const result = bootstrapCoder.inputContainerClasses(testCase.width);
        expect(result).toEqual(testCase.expected);
      });
    });

    test('BOOTW004: should return "col-12" when width is greater than or equal to 100', () => {
      bootstrapCoder.setNumColumns(1);
      const result = bootstrapCoder.inputContainerClasses(100);
      expect(result).toEqual(['col-md-12']);
    });
  });
});
