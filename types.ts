interface CountryData {
  name: {
    common: string;
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

interface LookUpData {
  name: {
    common: string;
  };
  cca3: string;
}
interface DetailedData extends CountryData {
  cca3: string;
  currencies: {
    [key: string]: string;
  };
  tld: string[];
  subregion: string;
}

export { CountryData, DetailedData, LookUpData };
