import { CountryData } from "./types";
// elements
const main = document.getElementById("main") as HTMLElement;
const countriesContainer = document.getElementById(
  "item-container"
) as HTMLElement;
const searchElement = document.getElementById("search") as HTMLInputElement;
const filterElement = document.getElementById("filter") as HTMLInputElement;
let darkModeOn: boolean =
  JSON.parse(localStorage.getItem("isDarkMode")) || false;
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

const showDetailedinfo = (v: CountryData) => {
  const newUrl = `/detailed-info/country.html?country=${v.name.common}`;
  window.location.href = newUrl;
};
const renderElement = () => {
  const searchValue = searchElement.value;
  const filterValue = filterElement.value;

  try {
    countriesContainer.replaceChildren();
    if (searchValue) {
      duplicateCountriesData = countriesData.filter((country) => {
        return country.name.common
          .toLowerCase()
          .trim()
          .includes(searchValue.toLowerCase().trim());
      });
    } else if (!searchValue) {
      duplicateCountriesData = countriesData;
    }
    if (filterValue && filterValue !== "Filter by Region") {
      duplicateCountriesData = duplicateCountriesData.filter((country) => {
        return country.region
          .toLowerCase()
          .trim()
          .includes(filterValue.trim().toLowerCase());
      });
    } else if (!filterValue) {
      duplicateCountriesData = countriesData;
    }

    const countries = duplicateCountriesData.map((v) => {
      const item = document.createElement("div");
      item.className = "item";
      item.addEventListener("click", () => showDetailedinfo(v));

      const flagElement = createFlagImage(v.flags.png, v.flags.alt);
      const name = createData(v.name.common);
      name.className = "title";
      const population = createData(v.population.toString(), "Population");
      const region = createData(v.region, "Region");
      const capital = createData(
        v.capital ? v.capital[0] : "Unknown",
        "Capital"
      );
      checkDarkMode();
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

const search = (): void => {
  const searchValue = searchElement.value;

  if (searchValue) {
    duplicateCountriesData = duplicateCountriesData.filter((country) => {
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

const filter = (): void => {
  const filterValue = filterElement.value;
  if (filterValue) {
    duplicateCountriesData = duplicateCountriesData.filter((country) => {
      return country.region
        .toLowerCase()
        .trim()
        .includes(filterValue.trim().toLowerCase());
    });
    renderElement();
  } else {
    duplicateCountriesData = countriesData;
  }
};
const removeFilter = (): void => {
  filterElement.value = "Filter by Region";
  renderElement();
};
const checkDarkMode = (): void => {
  if (darkModeOn) {
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }
};
const toggleDarkMode = (): void => {
  darkModeOn = !darkModeOn;
  if (darkModeOn) {
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }
  localStorage.setItem("isDarkMode", JSON.stringify(darkModeOn));
  console.log("Dark mode pressed");
};
window.addEventListener("load", async () => {
  await fetchAPIData();
  renderElement();
  return null;
});
