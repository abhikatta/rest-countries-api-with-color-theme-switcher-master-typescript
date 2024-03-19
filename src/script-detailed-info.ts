import { DetailedData } from "./types";
// elements:
const itemContainer = document.getElementById(
  "detailed-item-container"
) as HTMLElement;

const params = new URLSearchParams(window.location.search);
const country = params.get("country");
let detailedCountryData: DetailedData[];
let lookUpData = new Map();
let darkModeOn: boolean =
  JSON.parse(localStorage.getItem("isDarkMode")) || false;
// API endpoints
const FILTERED_API_ENDPOINT = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
const LOOK_UP_URL = "https://restcountries.com/v3.1/all?fields=name,cca3";
const fetchLookUpData = async () => {
  try {
    const res = await fetch(LOOK_UP_URL);
    const data: DetailedData[] = await res.json();
    data.map((country) => {
      lookUpData.set(country.cca3, country.name.common);
    });
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
const createSpanLabel = (data: string): HTMLSpanElement => {
  const label = document.createElement("span");
  label.textContent = data + ": ";
  label.className = "label";
  return label;
};
const createData = (data: string, title?: string): HTMLParagraphElement => {
  const dataElement = document.createElement("p");
  const dataElementLabel = createSpanLabel(title);
  dataElement.append(dataElementLabel);
  dataElement.append(document.createTextNode(data));
  return dataElement;
};
const borderCountryLookup = (v: string): string | null => {
  if (lookUpData.has(v)) {
    return lookUpData.get(v);
  } else {
    return null;
  }
};
const renderDetailedElement = () => {
  const detailedCountry = detailedCountryData.map((country) => {
    const div = document.createElement("div");
    div.className = "detailed-view-container";
    const image = createFlagImage(country.flags.png, country.flags.alt);
    const name = document.createElement("p");
    name.textContent = country.name.common;
    name.className = "detailed-title";

    // all data (flag+title+data+borders)
    const allDataDiv = document.createElement("div");
    allDataDiv.className = "detailed-all-data-div";
    // main data div
    const dataDiv = document.createElement("div");
    dataDiv.className = "detailed-main-data";
    const nativeName = document.createElement("p");
    const nativeNamelabel = createSpanLabel("Native Name");
    nativeName.appendChild(nativeNamelabel);

    for (const key in country.name.nativeName) {
      const element = country.name.nativeName[key].common || "Unknown";
      nativeName.appendChild(document.createTextNode(element + ", "));
    }
    const region = createData(country.region || "Unknown", "Region");
    const subRegion = createData(country.subregion || "Unknown", "Sub Region");
    const capital = createData(
      country.capital ? country.capital[0] : "Unknown",
      "Capital"
    );
    const population = createData(
      country.population.toString() || "Unknown",
      "Population"
    );

    const topLevelDomains = document.createElement("p");
    const tldLabel = document.createElement("span");
    tldLabel.className = "label";
    tldLabel.textContent = "Top Level Domains: ";
    topLevelDomains.append(tldLabel);

    country.tld.map((v) =>
      topLevelDomains.append(document.createTextNode(v + ", "))
    );

    const currencies = document.createElement("p");
    const currenciesLabel = document.createElement("span");
    currenciesLabel.append(document.createTextNode("Currencies: "));
    currenciesLabel.className = "label";
    currencies.append(currenciesLabel);
    // currencies.textContent += "Currencies: ";

    for (const key in country.currencies) {
      const element = country.currencies[key];
      currencies.append(document.createTextNode(element.name + ", "));
    }

    const languages = document.createElement("p");
    const languagesLabel = document.createElement("span");
    languagesLabel.append(document.createTextNode("Languages: "));
    languagesLabel.className = "label";
    languages.append(languagesLabel);
    for (const key in country.languages) {
      const element = country.languages[key];
      languages.append(document.createTextNode(element + ", "));
    }
    const borderCountriesContainer = document.createElement("div");
    borderCountriesContainer.className = "border-countries-container";
    const borderCountryLabel = document.createElement("span");
    borderCountryLabel.append(document.createTextNode("Border Countries: "));
    borderCountryLabel.className = "label";
    borderCountriesContainer.append(borderCountryLabel);

    country.borders
      ? country.borders.map((border) => {
          const borderCountry = document.createElement("p");
          borderCountry.className = "border-country";
          const borderCountryName = borderCountryLookup(border);
          borderCountry.textContent += borderCountryName;
          borderCountriesContainer.append(borderCountry);
          borderCountry.addEventListener("click", () => {
            const newUrl = `country.html?country=${borderCountryName}`;
            window.location.href = newUrl;
          });
        })
      : (borderCountriesContainer.textContent += "Unknown");
    checkDarkMode();
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
const checkDarkMode = () => {
  if (darkModeOn) {
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }
};
const toggleDarkMode = () => {
  darkModeOn = !darkModeOn;
  if (darkModeOn) {
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }
  localStorage.setItem("isDarkMode", JSON.stringify(darkModeOn));
};
const goHome = () => {
  window.location.href = window.location.origin;
};
window.addEventListener("load", async () => {
  await fetchLookUpData();
  await fetchDetailedData();
  renderDetailedElement();
});
