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
// elements:
const itemContainer = document.getElementById("detailed-item-container");
const params = new URLSearchParams(window.location.search);
const country = params.get("country");
let detailedCountryData;
let lookUpData;
// API endpoints
const FILTERED_API_ENDPOINT = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
const LOOK_UP_URL = "https://restcountries.com/v3.1/all?fields=name,cca3";
const fetchLookUpData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(LOOK_UP_URL);
        const data = yield res.json();
        lookUpData = data;
    }
    catch (error) { }
    return null;
});
const fetchDetailedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(FILTERED_API_ENDPOINT);
        const data = yield res.json();
        detailedCountryData = data;
    }
    catch (error) {
        if (error instanceof Error) {
            itemContainer.textContent = `Something went Wrong!\n,${error.message}`;
        }
    }
    return null;
});
const showDetailedinfo = (v) => {
    const newUrl = `/detailed-info/country.html?country=${v.name.common}`;
    window.location.href = newUrl;
};
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
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchLookUpData();
    yield fetchDetailedData();
    renderDetailedElement();
}));
//# sourceMappingURL=script-detailed-info.js.map