import { createData, createFlagImage } from "../utils";

describe("createData function", () => {
  test("should create a p element with correct content", () => {
    const testData = "Test Data";
    const testTitle = "Test Title";
    const result = createData(testData, testTitle);
    expect(result.tagName.toLowerCase()).toBe("p");
    expect(result.textContent).toContain(testData);
    expect(result.textContent).toBe(`${testTitle}: ${testData}`);
  });

  test("should create a p element without title", () => {
    const testData = "Test Data";
    const result = createData(testData);
    expect(result.tagName.toLowerCase()).toBe("p");
    expect(result.textContent).toBe(testData);
  });
});
describe("createflagimage function ", () => {
  test("create an image of flag successfully", () => {
    const URL = "test_url.png";
    const ALT = "test_alt";
    const image = createFlagImage(URL, ALT);
    expect(image.alt).toBe(ALT);
    expect(image.tagName.toLowerCase()).toBe("img");
    expect(image.src).toContain(URL);
  });
});
