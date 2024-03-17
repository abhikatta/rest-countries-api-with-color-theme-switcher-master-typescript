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
function fetchDetailedData() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(FILTERED_API_ENDPOINT);
        const data = yield res.json();
        console.log(data);
        return null;
    });
}
//# sourceMappingURL=script-detailed-info.js.map