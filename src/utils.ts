const showDetailedinfo = (countryName: string) => {
  // from index.html to ./country.html or ./country.html to same page with changeed search params
  const newUrl = `./country.html?country=${countryName}`;
  window.location.href = newUrl;
  return null;
};

export { showDetailedinfo };
