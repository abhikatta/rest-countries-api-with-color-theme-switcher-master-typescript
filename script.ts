interface CountryData {
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
let countriesData: CountryData[];
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

const createFlagImage = (url: string, alt: string) => {
  const flagElement = document.createElement("img");
  flagElement.src = url;
  flagElement.alt = alt;
  return flagElement;
};

const createData = (data: string) => {
  const dataElement = document.createElement("p");
  dataElement.textContent = data;
  return dataElement;
};

const renderElement = () => {
  try {
    const countriesContainer = document.createElement("div");

    const countries = countriesData.map((v) => {
      const item = document.createElement("div");

      const flagElement = createFlagImage(v.flags.png, v.flags.alt);
      const name = createData(v.name.common);
      const population = createData(v.population.toString());
      const region = createData(v.region);
      const capital = createData(v.capital ? v.capital[0] : "Unknown");

      item.append(flagElement, name, population, region, capital);
      return item;
    });
    countries.map((country) => {
      countriesContainer.append(country);
    });
    main.appendChild(countriesContainer);
  } catch (error) {
    if (error instanceof Error) main.innerHTML = `<p>${error.message}</p>`;
  }
};
window.addEventListener("load", async () => {
  await fetchAPIData();
  renderElement();
  return null;
});
