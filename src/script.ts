import { CountryData } from "./types";
import {
  createData,
  createFlagImage,
  fetchAPIData,
  filter,
  search,
  showDetailedinfo,
} from "./utils";

// elements
const main: HTMLElement = document.getElementById("main")!;
const countriesContainer = document.getElementById(
  "item-container"
) as HTMLElement;
const searchElement = document.getElementById("search") as HTMLInputElement;
const filterElement = document.getElementById("filter") as HTMLSelectElement;
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

const renderElement = () => {
  const searchValue = searchElement.value;
  const filterValue = filterElement.value;

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
  const countriesDataArray = await fetchAPIData<CountryData>(
    main,
    API_ENDPOINT
  );
  if (countriesDataArray) {
    countriesData = countriesDataArray;
    duplicateCountriesData = [...countriesData];
  }
  renderElement();
  return null;
});

darkModeButton.addEventListener("click", () => {
  toggleDarkMode();
});

filterElement.addEventListener("input", () => {
  duplicateCountriesData = filter(
    filterElement,
    duplicateCountriesData,
    countriesData,
    renderElement
  );
});
removeFilterButton.addEventListener("click", removeFilter);
searchElement.addEventListener("input", () => {
  duplicateCountriesData = search(
    searchElement,
    duplicateCountriesData,
    countriesData,
    renderElement
  );
});
