import { CountryData, DetailedData, LookUpData } from "../types";

// interface
// interface LookUpData {
//   name: {
//     common: string;
//   };
//   cca3: string;
// }
// interface DetailedData extends CountryData {
//   cca3: string;
//   currencies: {
//     [key: string]: string;
//   };
//   tld: string[];
//   subregion: string;
// }
const params = new URLSearchParams(window.location.search);
const country = params.get("country");

// API endpoints
const FILTERED_API_ENDPOINT = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
const LOOK_UP_URL = "https://restcountries.com/v3.1/all?fields=name,cca3";

window.addEventListener("load", fetchDetailedData);
async function fetchDetailedData() {
  const res = await fetch(FILTERED_API_ENDPOINT);
  const data = await res.json();
  console.log(data);

  return null;
}
