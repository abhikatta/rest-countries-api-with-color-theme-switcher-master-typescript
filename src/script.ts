import { CountryData } from "./types";
import { showDetailedinfo } from "./utils";
// elements
const main = document.getElementById("main") as HTMLElement;
const countriesContainer = document.getElementById(
  "item-container"
) as HTMLElement;
const searchElement = document.getElementById("search") as HTMLInputElement;
const filterElement = document.getElementById("filter") as HTMLInputElement;
const darkModeButton = document.getElementById(
  "darkMode-button"
) as HTMLButtonElement;
const removeFilterButton = document.getElementById(
  "remove-filter"
) as HTMLButtonElement;
let darkModeOn: boolean = JSON.parse(
  localStorage.getItem("isDarkMode") || JSON.stringify(false)
);
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

    const countries = duplicateCountriesData.map((countryItem) => {
      const item = document.createElement("div");
      item.className = "item";
      item.addEventListener("click", () =>
        showDetailedinfo(countryItem.name.common)
      );

      const flagElement = createFlagImage(
        countryItem.flags.png,
        countryItem.flags.alt
      );
      const name = createData(countryItem.name.common);
      name.className = "title";
      const population = createData(
        countryItem.population.toString(),
        "Population"
      );
      const region = createData(countryItem.region, "Region");
      const capital = createData(
        countryItem.capital ? countryItem.capital[0] : "Unknown",
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
};
window.addEventListener("load", async () => {
  await fetchAPIData();
  renderElement();
  return null;
});

darkModeButton.addEventListener("click", () => {
  toggleDarkMode();
});

filterElement.addEventListener("input", filter);
removeFilterButton.addEventListener("click", removeFilter);
searchElement.addEventListener("input", search);
