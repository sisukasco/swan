import {DRow, VisualElement} from "../src/lib";
import {factory} from "../src/lib";
import { generateHTMLCode } from './../src/coder/CodeGen';

function newVisualElement(){
    const newElemt = factory.makeObject("Textbox");
    return new VisualElement(newElemt)
}
describe("DRow", () => {
  describe("getOverflowingItems", () => {
    it("row001: returns an empty array if all elements fit within the row width", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      v1.setWidth(50)
      const v2 = newVisualElement();
      v2.setWidth(50)
      row.push([v1, v2]);

      const result = row.getOverflowingItems();

      expect(result).toEqual([]);
    });

    it("row002: returns an array with elements that exceed the row width", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      v1.setWidth(50)
      const v2 = newVisualElement();
      v2.setWidth(75)
      
      row.push([v1, v2]);

      const result = row.getOverflowingItems();

      expect(result).toEqual([v2]);
    });

    it("row003: removes overflowing elements from the row", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      v1.setWidth(50)
      const v2 =  newVisualElement();
      v2.setWidth(75)
      row.push([v1, v2]);

      row.getOverflowingItems();

      expect(row.elements).toEqual([v1]);
    });

    it("row004: handles multiple overflowing elements", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      const v2 = newVisualElement();
      const v3 = newVisualElement();
      row.push([v1, v2, v3]);

      const result = row.getOverflowingItems();
      console.log("result len ", result.length)

      console.log("elements len ", row.elements.length)
      expect(result).toEqual([v2, v3]);
      expect(row.elements).toEqual([v1]);
    });

    it("row005: handles multiple overflowing elements with different widths", () => {
        const row = new DRow();
        const v1 = newVisualElement();
        v1.setWidth(25)
        const v2 = newVisualElement();
        v2.setWidth(25)
        const v3 = newVisualElement();
        const v4 = newVisualElement();
        row.push([v1, v2, v3, v4]);
  
        const result = row.getOverflowingItems();
        expect(result).toEqual([v3, v4]);
        expect(row.elements).toEqual([v1, v2]);
      });
  });

  describe("findElement", () => {
    it("row1001: returns true if an element with the given ID exists in the row", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      const v2 = newVisualElement();
      row.push([v1, v2]);

      const result = row.findElement(v2);

      expect(result).toBe(true);
    });

    it("row1002: returns false if an element with the given ID does not exist in the row", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      const v2 = newVisualElement();
      row.push([v1]);

      expect(row.findElement(v2)).toBe(false);

      expect(row.findElement(v1)).toBe(true);

      row.push([v2]);

      expect(row.findElement(v2)).toBe(true);      

    });
  });


  describe("removeElement", () => {
    it("row2001: removes an element from the row and returns true", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      const v2 = newVisualElement();
      row.push([v1, v2]);

      const result = row.removeElement(v2);

      expect(result).toBe(true);
      expect(row.elements).toEqual([v1]);
    });

    it("row2002: does not remove any element and returns false if the given element is not in the row", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      const v2 = newVisualElement();
      row.push([v1]);

      const result = row.removeElement(v2);

      expect(result).toBe(false);
      expect(row.elements).toEqual([v1]);
    });
  });


  describe("code", () => {
    it("row3001: generates correct HTML code when the row has no condition", () => {
      const row = new DRow();
      const v1 = newVisualElement();
      row.push([v1]);

      const code = generateHTMLCode(row)

      expect(code).toContain(v1.elmnt.name)
      expect(code).not.toContain("r-show")

    });

   it("row3002: generates correct HTML code when the row has a condition", () => {
      const row = new DRow();
      row.condition = "enable_address";
      const v1 = newVisualElement();
      row.push([v1]);
      
      const code = generateHTMLCode(row)

      expect(code).toContain('r-show="enable_address"')
      expect(code).toContain(v1.elmnt.name)
      //const expected = '<div class="layout-row" r-show="some condition"><div></div><div></div></div>';
      //expect(node.generate()).toEqual(expected);
    });

    
    it("row3003: does not generate any HTML code when the row has no elements", () => {
      const row = new DRow();
      
      const code = generateHTMLCode(row).trim()

      console.log("generated code|%s| ", code)

      expect(code).toBe('')
      //expect(node.generate()).toEqual(undefined);
    });
    
  });
});
