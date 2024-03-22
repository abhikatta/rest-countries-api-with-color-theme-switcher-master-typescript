import { filter, search } from "../utils";

import { CountryData } from "../types";
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
    expect(filteredData).toBe(countriesData);
  });
});

describe("search function", () => {
  test("should search for country and return all countries that contain the substring", () => {
    const countriesData = [...duplicateCountriesData];
    const searchValue = "Country2";
    const mockFunction = jest.fn();
    const data = search(
      searchValue,
      duplicateCountriesData,
      countriesData,
      mockFunction
    );
    expect(data[0].name.common).toBe(searchValue);
    data.map((country) => {
      expect(country.name.common.toLowerCase().trim()).toContain(
        searchValue.toLowerCase()
      );
    });
  });
  test("should not search anything and return original array when null is passed", () => {
    const countriesData = [
      ...duplicateCountriesData,
      {
        name: {
          common: "Country6",
          nativeName: { eng: { common: "Country6", official: "Country6" } },
        },
        capital: ["Capital6"],
        region: "Region3",
        population: 1000000,
        flags: { png: "flag6.png", svg: "flag6.svg", alt: "Flag 6" },
      },
    ];
    const searchValue = null;
    const mockFunction = jest.fn();
    const data = search(
      searchValue,
      duplicateCountriesData,
      countriesData,
      mockFunction
    );
    expect(data).toBe(countriesData);
    expect(data).not.toBe(duplicateCountriesData);
  });
});
