"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// elements
const main = document.getElementById("main");
const countriesContainer = document.getElementById("item-container");
const searchElement = document.getElementById("search");
const filterElement = document.getElementById("filter");
let darkModeOn = JSON.parse(localStorage.getItem("isDarkMode")) || false;
// API endpoint
const API_ENDPOINT = "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region";
// data
let countriesData;
let duplicateCountriesData;
const fetchAPIData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(API_ENDPOINT);
        const data = yield res.json();
        countriesData = JSON.parse(JSON.stringify(data));
        duplicateCountriesData = JSON.parse(JSON.stringify(countriesData));
    }
    catch (error) {
        if (error instanceof Error) {
            main.textContent = `${"something went wrong" + error.message}`;
        }
    }
    return null;
});
const createFlagImage = (url, alt) => {
    const flagElement = document.createElement("img");
    flagElement.src = url;
    flagElement.alt = alt;
    return flagElement;
};
const createData = (data, title) => {
    const dataElement = document.createElement("p");
    dataElement.textContent = title ? title + ": " + data : data;
    return dataElement;
};
const showDetailedinfo = (v) => {
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
        }
        else if (!searchValue) {
            duplicateCountriesData = countriesData;
        }
        if (filterValue && filterValue !== "Filter by Region") {
            duplicateCountriesData = duplicateCountriesData.filter((country) => {
                return country.region
                    .toLowerCase()
                    .trim()
                    .includes(filterValue.trim().toLowerCase());
            });
        }
        else if (!filterValue) {
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
            const capital = createData(v.capital ? v.capital[0] : "Unknown", "Capital");
            checkDarkMode();
            item.append(flagElement, name, population, region, capital);
            return item;
        });
        countries.map((country) => {
            countriesContainer.append(country);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            main.textContent = `${"something went wrong" + error.message}`;
        }
    }
};
const search = () => {
    const searchValue = searchElement.value;
    if (searchValue) {
        duplicateCountriesData = duplicateCountriesData.filter((country) => {
            return country.name.common
                .toLowerCase()
                .trim()
                .includes(searchValue.toLowerCase().trim());
        });
    }
    else {
        duplicateCountriesData = countriesData;
    }
    renderElement();
    return null;
};
const filter = () => {
    const filterValue = filterElement.value;
    if (filterValue) {
        duplicateCountriesData = duplicateCountriesData.filter((country) => {
            return country.region
                .toLowerCase()
                .trim()
                .includes(filterValue.trim().toLowerCase());
        });
        renderElement();
    }
    else {
        duplicateCountriesData = countriesData;
    }
};
const removeFilter = () => {
    filterElement.value = "Filter by Region";
    renderElement();
};
const checkDarkMode = () => {
    if (darkModeOn) {
        document.body.classList.add("darkMode");
    }
    else {
        document.body.classList.remove("darkMode");
    }
};
const toggleDarkMode = () => {
    darkModeOn = !darkModeOn;
    if (darkModeOn) {
        document.body.classList.add("darkMode");
    }
    else {
        document.body.classList.remove("darkMode");
    }
    localStorage.setItem("isDarkMode", JSON.stringify(darkModeOn));
};
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchAPIData();
    renderElement();
    return null;
}));
//# sourceMappingURL=script.js.map