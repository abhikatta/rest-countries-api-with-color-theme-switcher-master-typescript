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
const showDetailedinfo = (v: CountryData) => {
  const newUrl = `/detailed-info/country.html?country=${v.name.common}`;
  window.location.href = newUrl;
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

const renderDetailedElement = () => {
  const detailedCountry = detailedCountryData.map((v) => {
    const div = document.createElement("div");

    const image = createFlagImage(v.flags.png, v.flags.alt);
    const name = createData(v.name.common);
    const nativeName = document.createElement("p");
    nativeName.textContent = "Native Name: ";
    for (const key in v.name.nativeName) {
      const element = v.name.nativeName[key].common;
      nativeName.textContent += element + ", ";
    }
    const region = createData(v.region, "Region");
    const subRegion = createData(v.subregion, "Sub Region");
    const population = createData(v.population.toString(), "Population");

    div.append(image, name, nativeName, region, subRegion, population);

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
