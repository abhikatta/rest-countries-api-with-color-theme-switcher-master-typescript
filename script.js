var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// elements
var main = document.getElementById("main");
var countriesContainer = document.getElementById("item-container");
var searchElement = document.getElementById("search");
// API endpoint
var API_ENDPOINT = "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region";
// data
var countriesData;
var duplicateCountriesData;
var fetchAPIData = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(API_ENDPOINT)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                countriesData = JSON.parse(JSON.stringify(data));
                duplicateCountriesData = JSON.parse(JSON.stringify(countriesData));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    main.textContent = "".concat("something went wrong" + error_1.message);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, null];
        }
    });
}); };
var createFlagImage = function (url, alt) {
    var flagElement = document.createElement("img");
    flagElement.src = url;
    flagElement.alt = alt;
    return flagElement;
};
var createData = function (data, title) {
    var dataElement = document.createElement("p");
    dataElement.textContent = title ? title + ": " + data : data;
    return dataElement;
};
var renderElement = function () {
    try {
        countriesContainer.replaceChildren();
        var countries = duplicateCountriesData.map(function (v) {
            var item = document.createElement("div");
            item.className = "item";
            var flagElement = createFlagImage(v.flags.png, v.flags.alt);
            var name = createData(v.name.common);
            name.className = "title";
            var population = createData(v.population.toString(), "Population");
            var region = createData(v.region, "Region");
            var capital = createData(v.capital ? v.capital[0] : "Unknown", "Capital");
            item.append(flagElement, name, population, region, capital);
            return item;
        });
        countries.map(function (country) {
            countriesContainer.append(country);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            main.textContent = "".concat("something went wrong" + error.message);
        }
    }
};
var search = function () {
    var searchValue = searchElement.value;
    if (searchValue) {
        console.log(searchValue + " this is changed");
        duplicateCountriesData = countriesData.filter(function (country) {
            return country.name.common
                .toLowerCase()
                .trim()
                .includes(searchValue.toLowerCase().trim());
        });
        renderElement();
        console.log(duplicateCountriesData);
    }
    else {
        duplicateCountriesData = countriesData;
    }
    console.log("renderelemetn ran");
    return null;
};
var toggleDarkMode = function () {
    console.log("Dark mode pressed");
};
window.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchAPIData()];
            case 1:
                _a.sent();
                renderElement();
                return [2 /*return*/, null];
        }
    });
}); });
//# sourceMappingURL=script.js.map