interface CountriesData {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: string;
    };
  };
  capital: string[] | null;
  region: string;
  languages: {
    [key: string]: string;
  };
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}

// elements
const main = document.getElementById("main") as HTMLElement;

// API endpoint
const API_ENDPOINT =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,nativeName";

// data
let countriesData: CountriesData[];
const fetchAPIData = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    countriesData = data;
  } catch (error) {
    if (error instanceof Error) {
      main.innerHTML = `<p>${"something went wrong" + error.message}</p>`;
    }
  }
  return null;
};

const renderElement = () => {
  try {
    countriesData.forEach((v) => {
      main.innerHTML += `<p>${v.name.common}</p>`;
    });
  } catch (error) {
    if (error instanceof Error) main.innerHTML = `<p>${error.message}</p>`;
  }
};
window.addEventListener("load", async () => {
  await fetchAPIData();
  renderElement();
  return null;
});
