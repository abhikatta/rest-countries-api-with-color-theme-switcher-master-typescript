import { CountryData, DetailedData } from "./types";

const showDetailedinfo = (countryName: string) => {
  // from index.html to ./country.html or ./country.html to same page with changeed search params
  const newUrl = `./country.html?country=${countryName}`;
  window.location.href = newUrl;
  return null;
};
const fetchAPIData = async <G extends CountryData | DetailedData>(
  main: HTMLElement,
  API_ENDPOINT: string
): Promise<G[] | null> => {
  console.log(API_ENDPOINT);

  try {
    const res = await fetch(API_ENDPOINT);
    const data: G[] = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      main.textContent = `Something went wrong: \n${error.name}: ${error.message}`;
    }
    return null;
  }
};

const createData = (data: string, title?: string): HTMLParagraphElement => {
  const dataElement = document.createElement("p");
  dataElement.textContent = title ? title + ": " + data : data;
  return dataElement;
};

const createFlagImage = (url: string, alt: string): HTMLImageElement => {
  const flagElement = document.createElement("img");
  flagElement.src = url;
  flagElement.alt = alt;
  return flagElement;
};
export { showDetailedinfo, fetchAPIData, createData, createFlagImage };
