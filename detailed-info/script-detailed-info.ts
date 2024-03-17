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
  const detailedCountry = detailedCountryData.map((v) => {
    const div = document.createElement("div");

    const image = createFlagImage(v.flags.png, v.flags.alt);
    const name = createData(v.name.common || "Unknown");
    const nativeName = document.createElement("p");
    nativeName.textContent = "Native Name: ";
    for (const key in v.name.nativeName) {
      const element = v.name.nativeName[key].common || "Unknown";
      nativeName.textContent += element + ", ";
    }
    const region = createData(v.region || "Unknown", "Region");
    const subRegion = createData(v.subregion || "Unknown", "Sub Region");
    const capital = createData(
      v.capital ? v.capital[0] : "Unknown",
      "Capital "
    );
    const population = createData(
      v.population.toString() || "Unknown",
      "Population"
    );

    const topLevelDomains = document.createElement("p");
    topLevelDomains.textContent += "Top Level Domains: ";
    v.tld.map((v) => (topLevelDomains.textContent += v + ", "));

    const currencies = document.createElement("p");
    currencies.textContent += "Currencies: ";
    for (const key in v.currencies) {
      const element = v.currencies[key];
      currencies.textContent += element.name + ", ";
    }

    const languages = document.createElement("p");
    languages.textContent += "Languages: ";
    for (const key in v.languages) {
      const element = v.languages[key];
      languages.textContent += element + ", ";
    }
    const borderCountriesContainer = document.createElement("div");
    borderCountriesContainer.textContent = "Border Countries: ";

    v.borders.map((border) => {
      const borderCountry = document.createElement("p");
      borderCountry.className = "border-country";
      const borderCountryName = borderCountryLookup(border);
      borderCountry.textContent += borderCountryName;
      borderCountriesContainer.append(borderCountry);
      borderCountry.addEventListener("click", () => {
        const newUrl = `/detailed-info/country.html?country=${borderCountryName}`;
        window.location.href = newUrl;
      });
    });

    div.append(
      image,
      name,
      nativeName,
      population,
      region,
      capital,
      subRegion,
      topLevelDomains,
      currencies,
      languages,
      borderCountriesContainer
    );
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
