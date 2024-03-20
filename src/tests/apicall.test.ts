import { CountryData } from "../types";
import { fetchAPIData } from "../utils";

describe("fetchCountriesData function", () => {
  test("should fetch data successfully", async () => {
    const mockData = [
      {
        name: {
          common: "Cyprus",
          official: "Republic of Cyprus",
          nativeName: {
            ell: {
              official: "Δημοκρατία της Κύπρος",
              common: "Κύπρος",
            },
            tur: {
              official: "Kıbrıs Cumhuriyeti",
              common: "Kıbrıs",
            },
          },
        },
        tld: [".cy"],
        cca2: "CY",
        ccn3: "196",
        cca3: "CYP",
        cioc: "CYP",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {
          EUR: {
            name: "Euro",
            symbol: "€",
          },
        },
        idd: {
          root: "+3",
          suffixes: ["57"],
        },
        capital: ["Nicosia"],
        altSpellings: [
          "CY",
          "Kýpros",
          "Kıbrıs",
          "Republic of Cyprus",
          "Κυπριακή Δημοκρατία",
          "Kıbrıs Cumhuriyeti",
        ],
        region: "Europe",
        subregion: "Southern Europe",
        languages: {
          ell: "Greek",
          tur: "Turkish",
        },
        translations: {
          ara: {
            official: "جمهورية قبرص",
            common: "قبرص",
          },
          bre: {
            official: "Republik Kiprenez",
            common: "Kiprenez",
          },
          ces: {
            official: "Kyperská republika",
            common: "Kypr",
          },
          cym: {
            official: "Gweriniaeth Cyprus",
            common: "Cyprus",
          },
          deu: {
            official: "Republik Zypern",
            common: "Zypern",
          },
          est: {
            official: "Küprose Vabariik",
            common: "Küpros",
          },
          fin: {
            official: "Kyproksen tasavalta",
            common: "Kypros",
          },
          fra: {
            official: "République de Chypre",
            common: "Chypre",
          },
          hrv: {
            official: "Republika Cipar",
            common: "Cipar",
          },
          hun: {
            official: "Ciprusi Köztársaság",
            common: "Ciprus",
          },
          ita: {
            official: "Repubblica di Cipro",
            common: "Cipro",
          },
          jpn: {
            official: "キプロス共和国",
            common: "キプロス",
          },
          kor: {
            official: "키프로스 공화국",
            common: "키프로스",
          },
          nld: {
            official: "Republiek Cyprus",
            common: "Cyprus",
          },
          per: {
            official: "جمهوری قبرس",
            common: "قِبرِس",
          },
          pol: {
            official: "Republika Cypryjska",
            common: "Cypr",
          },
          por: {
            official: "República de Chipre",
            common: "Chipre",
          },
          rus: {
            official: "Республика Кипр",
            common: "Кипр",
          },
          slk: {
            official: "Cyperská republika",
            common: "Cyprus",
          },
          spa: {
            official: "República de Chipre",
            common: "Chipre",
          },
          srp: {
            official: "Кипарска Република",
            common: "Кипар",
          },
          swe: {
            official: "Republiken Cypern",
            common: "Cypern",
          },
          tur: {
            official: "Kıbrıs Cumhuriyeti",
            common: "Kıbrıs",
          },
          urd: {
            official: "جمہوریہ قبرص",
            common: "قبرص",
          },
          zho: {
            official: "塞浦路斯共和国",
            common: "塞浦路斯",
          },
        },
        latlng: [35, 33],
        landlocked: false,
        area: 9251,
        demonyms: {
          eng: {
            f: "Cypriot",
            m: "Cypriot",
          },
          fra: {
            f: "Chypriote",
            m: "Chypriote",
          },
        },
        flag: "🇨🇾",
        maps: {
          googleMaps: "https://goo.gl/maps/77hPBRdLid8yD5Bm7",
          openStreetMaps: "https://www.openstreetmap.org/relation/307787",
        },
        population: 1207361,
        gini: {
          "2018": 32.7,
        },
        fifa: "CYP",
        car: {
          signs: ["CY"],
          side: "left",
        },
        timezones: ["UTC+02:00"],
        continents: ["Europe"],
        flags: {
          png: "https://flagcdn.com/w320/cy.png",
          svg: "https://flagcdn.com/cy.svg",
          alt: "The flag of Cyprus has a white field, at the center of which is a copper-colored silhouette of the Island of Cyprus above two green olive branches crossed at the stem.",
        },
        coatOfArms: {
          png: "https://mainfacts.com/media/images/coats_of_arms/cy.png",
          svg: "https://mainfacts.com/media/images/coats_of_arms/cy.svg",
        },
        startOfWeek: "monday",
        capitalInfo: {
          latlng: [35.17, 33.37],
        },
        postalCode: {
          format: "####",
          regex: "^(\\d{4})$",
        },
      },
    ];

    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    // globalThis.fetch = jest.fn().mockResolvedValue(mockData);
    // globalThis.fetch = jest
    //   .spyOn(fetch,'get')
    const main = document.createElement("div");

    const API_ENDPOINT =
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region";

    const result = await fetchAPIData<CountryData>(main, API_ENDPOINT);
    console.log("result is", result);

    expect(result).toEqual(mockData);
  });
  test("should not fetch data successfully", async () => {
    const mockRejectedValue = "Something went wrong";
    globalThis.fetch = jest
      .fn()
      .mockRejectedValue(new Error("testing for unsuccessful data retrieval"));
    const main = document.createElement("div");
    const API_ENDPOINT =
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region";

    const result = await fetchAPIData<CountryData>(main, API_ENDPOINT);

    expect(main.textContent?.toLowerCase()).toContain(
      mockRejectedValue.toLowerCase()
    );
    console.log(main.textContent);
  });
});
