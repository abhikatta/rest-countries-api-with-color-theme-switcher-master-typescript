import { filter, search } from "../utils";

import { CountryData } from "../types";

// describe("filters value from the data array and returns them ", () => {
//   test("successfull filtering", () => {
//     const filterElement = document.createElement("select") as HTMLSelectElement;
//     const region = "Europe";
//     filterElement.value = region;

//     const duplicateCountriesData = JSON.parse(JSON.stringify(filterData));
//     const countriesData = [...duplicateCountriesData];
//     const render = () => {
//       console.log("render function ran");
//     };
//     const data = filter(
//       filterElement,
//       duplicateCountriesData,
//       countriesData,
//       render
//     );
//     console.log(data);
//     console.log(countriesData);

//     data.map((country) => {
//       expect(country.region.toLowerCase()).toBe(region.toLowerCase());
//     });
//   });
// });
const duplicateCountriesData: CountryData[] = [
  {
    name: {
      common: "Country1",
      nativeName: { eng: { common: "Country1", official: "Country1" } },
    },
    capital: ["Capital1"],
    region: "Region1",
    population: 1000000,
    flags: { png: "flag1.png", svg: "flag1.svg", alt: "Flag 1" },
  },
  {
    name: {
      common: "Country2",
      nativeName: { eng: { common: "Country2", official: "Country2" } },
    },
    capital: ["Capital2"],
    region: "Region1",
    population: 1000000,
    flags: { png: "flag2.png", svg: "flag2.svg", alt: "Flag 2" },
  },
  {
    name: {
      common: "Country3",
      nativeName: { eng: { common: "Country3", official: "Country3" } },
    },
    capital: ["Capital3"],
    region: "Region1",
    population: 1000000,
    flags: { png: "flag3.png", svg: "flag3.svg", alt: "Flag 3" },
  },
  {
    name: {
      common: "Country4",
      nativeName: { eng: { common: "Country4", official: "Country4" } },
    },
    capital: ["Capital4"],
    region: "Region2",
    population: 1000000,
    flags: { png: "flag4.png", svg: "flag4.svg", alt: "Flag 4" },
  },
  {
    name: {
      common: "Country5",
      nativeName: { eng: { common: "Country5", official: "Country5" } },
    },
    capital: ["Capital5"],
    region: "Region3",
    population: 1000000,
    flags: { png: "flag5.png", svg: "flag5.svg", alt: "Flag 5" },
  },
];
describe("filter function", () => {
  test("should filter countries by region", () => {
    let countriesData: CountryData[];
    countriesData = [...duplicateCountriesData];
    const mockFunction = jest.fn(() => console.log("mock function ran"));
    const filteredData = filter(
      "region1",
      duplicateCountriesData,
      countriesData,
      mockFunction
    );
    console.log(filteredData.length);
    if (filteredData.length !== 3) {
      console.log(
        "Received wrong array length, it is not 3:",
        filteredData.length
      );
    }
    filteredData.map((country) => {
      expect(country.region.toLowerCase()).toBe("region1");
    });
  });
  test("should not filter countries by region and return original data", () => {
    let countriesData: CountryData[];
    countriesData = [...duplicateCountriesData];
    const mockFunction = jest.fn(() => console.log("mock function ran"));
    const filteredData = filter(
      null,
      duplicateCountriesData,
      countriesData,
      mockFunction
    );
    console.log(filteredData.length);
    if (filteredData.length !== 3) {
      console.log(
        "Received wrong array length, it is not 3, its",
        filteredData.length
      );
    }
    expect(filteredData).toMatchObject(countriesData);
  });
});
