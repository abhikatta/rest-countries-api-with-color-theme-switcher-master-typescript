import { DetailedData, CountryData, LookUpData } from "../types";
// elements:
const itemContainer = document.getElementById(
  "detailed-item-container"
) as HTMLElement;

const params = new URLSearchParams(window.location.search);
const country = params.get("country");
let detailedCountryData: DetailedData[];
let lookUpData: LookUpData[];
// API endpoints
const FILTERED_API_ENDPOINT = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
const LOOK_UP_URL = "https://restcountries.com/v3.1/all?fields=name,cca3";
const fetchLookUpData = async () => {
  try {
    const res = await fetch(LOOK_UP_URL);
    const data = await res.json();
    lookUpData = data;
  } catch (error) {}
  return null;
};
const fetchDetailedData = async () => {
  try {
    const res = await fetch(FILTERED_API_ENDPOINT);
    const data = await res.json();
    detailedCountryData = data;
  } catch (error) {
    if (error instanceof Error) {
      itemContainer.textContent = `Something went Wrong!\n,${error.message}`;
    }
  }
  return null;
};

const createFlagImage = (url: string, alt: string): HTMLImageElement => {
  const flagElement = document.createElement("img");
  flagElement.src = url;
  flagElement.alt = alt;
  return flagElement;
};

const createData = (data: string, title?: string): HTMLParagraphElement => {
  const dataElement = document.createElement("p");
  dataElement.textContent = title ? title + ": " + data : data;
  return dataElement;
};
const borderCountryLookup = (v: string) => {
  const country = lookUpData.find((item) => {
    return item.cca3 === v;
  });
  if (country) {
    return country.name.common;
  } else return null;
};
const renderDetailedElement = () => {
  const detailedCountry = detailedCountryData.map((country) => {
    const div = document.createElement("div");
    div.className = "detailed-view-container";
    const image = createFlagImage(country.flags.png, country.flags.alt);
    const name = createData(country.name.common || "Unknown");
    name.className = "detailed-title";

    // all data (flag+title+data+borders)
    const allDataDiv = document.createElement("div");
    allDataDiv.className = "detailed-all-data-div";
    // main data div
    const dataDiv = document.createElement("div");
    dataDiv.className = "detailed-main-data";
    const nativeName = document.createElement("p");
    nativeName.textContent = "Native Name: ";
    for (const key in country.name.nativeName) {
      const element = country.name.nativeName[key].common || "Unknown";
      nativeName.textContent += element + ", ";
    }
    const region = createData(country.region || "Unknown", "Region");
    const subRegion = createData(country.subregion || "Unknown", "Sub Region");
    const capital = createData(
      country.capital ? country.capital[0] : "Unknown",
      "Capital "
    );
    const population = createData(
      country.population.toString() || "Unknown",
      "Population"
    );

    const topLevelDomains = document.createElement("p");
    topLevelDomains.textContent += "Top Level Domains: ";
    country.tld.map((v) => (topLevelDomains.textContent += v + ", "));

    const currencies = document.createElement("p");
    currencies.textContent += "Currencies: ";
    for (const key in country.currencies) {
      const element = country.currencies[key];
      currencies.textContent += element.name + ", ";
    }

    const languages = document.createElement("p");
    languages.textContent += "Languages: ";
    for (const key in country.languages) {
      const element = country.languages[key];
      languages.textContent += element + ", ";
    }
    const borderCountriesContainer = document.createElement("div");
    borderCountriesContainer.textContent = "Border Countries: ";
    borderCountriesContainer.className = "border-countries-container";
    country.borders
      ? country.borders.map((border) => {
          const borderCountry = document.createElement("p");
          borderCountry.className = "border-country";
          const borderCountryName = borderCountryLookup(border);
          borderCountry.textContent += borderCountryName;
          borderCountriesContainer.append(borderCountry);
          borderCountry.addEventListener("click", () => {
            const newUrl = `/detailed-info/country.html?country=${borderCountryName}`;
            window.location.href = newUrl;
          });
        })
      : (borderCountriesContainer.textContent += "Unknown");
    dataDiv.append(
      // name,
      nativeName,
      population,
      region,
      capital,
      subRegion,
      topLevelDomains,
      currencies,
      languages
      // borderCountriesContainer
    );
    allDataDiv.append(name, dataDiv, borderCountriesContainer);
    div.append(image, allDataDiv);
    return div;
  });
  itemContainer.append(detailedCountry[0]);
  return null;
};

window.addEventListener("load", async () => {
  await fetchLookUpData();
  await fetchDetailedData();
  renderDetailedElement();
});
