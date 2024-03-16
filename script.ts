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
const countriesContainer = document.getElementById(
  "item-container"
) as HTMLElement;
const searchElement = document.getElementById("search") as HTMLInputElement;

// API endpoint
const API_ENDPOINT =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region";

// data
let countriesData: CountryData[];
let duplicateCountriesData: CountryData[];
const fetchAPIData = async () => {
  try {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();
    countriesData = JSON.parse(JSON.stringify(data));
    duplicateCountriesData = JSON.parse(JSON.stringify(countriesData));
  } catch (error) {
    if (error instanceof Error) {
      main.textContent = `${"something went wrong" + error.message}`;
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

const renderElement = () => {
  try {
    countriesContainer.replaceChildren();
    const countries = duplicateCountriesData.map((v) => {
      const item = document.createElement("div");
      item.className = "item";

      const flagElement = createFlagImage(v.flags.png, v.flags.alt);
      const name = createData(v.name.common);
      name.className = "title";
      const population = createData(v.population.toString(), "Population");
      const region = createData(v.region, "Region");
      const capital = createData(
        v.capital ? v.capital[0] : "Unknown",
        "Capital"
      );
      item.append(flagElement, name, population, region, capital);
      return item;
    });
    countries.map((country) => {
      countriesContainer.append(country);
    });
  } catch (error) {
    if (error instanceof Error) {
      main.textContent = `${"something went wrong" + error.message}`;
    }
  }
};

const search = () => {
  const searchValue = searchElement.value;

  if (searchValue) {
    duplicateCountriesData = countriesData.filter((country) => {
      return country.name.common
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim());
    });
  } else {
    duplicateCountriesData = countriesData;
  }
  renderElement();
  return null;
};
const toggleDarkMode = () => {
  console.log("Dark mode pressed");
};
window.addEventListener("load", async () => {
  await fetchAPIData();
  renderElement();
  return null;
});
