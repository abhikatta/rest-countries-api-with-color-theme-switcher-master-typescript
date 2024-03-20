import { createData } from "../utils";

describe("createData function", () => {
  test("should create a p element with correct content", () => {
    const testData = "Test Data";
    const testTitle = "Test Title";
    const result = createData(testData, testTitle);
    expect(result.tagName.toLowerCase()).toBe("p");
    expect(result.textContent).toBe(`${testTitle}: ${testData}`);
  });

  test("should create a p element without title", () => {
    const testData = "Test Data";
    const result = createData(testData);
    expect(result.tagName.toLowerCase()).toBe("p");
    expect(result.textContent).toBe(testData);
  });
});
