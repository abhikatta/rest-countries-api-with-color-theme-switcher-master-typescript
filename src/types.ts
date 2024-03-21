interface CountryData {
  name: {
    common: string;
    nativeName: {
      [key: string]: { common: string; official: string };
    };
  };
  capital: string[] | null;
  region: string;

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
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  tld: string[];
  languages: {
    [key: string]: string;
  };

  subregion: string;
  borders: string[];
}

export type { CountryData, DetailedData, LookUpData };
