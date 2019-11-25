const { URL } = require("url");
const queryPriceMap = {
  "2000000": "(price::money::numeric::float8 < 2000000)",
  "2000000-4000000":
    "(price::money::numeric::float8 BETWEEN 2000000 AND 4000000)",
  "4000000-7000000":
    "(price::money::numeric::float8 BETWEEN 4000000 AND 7000000)",
  "7000000-13000000":
    "(price::money::numeric::float8 BETWEEN 7000000 AND 13000000)",
  "13000000": "(price::money::numeric::float8 > 13000000)"
};

makeQueryFilterProductsWithParams = (urlStr, array) => {
  // Get current URL
  const currentURL = new URL(urlStr);

  let query =
    'SELECT id, name, brand, price, promote, path, rating, "dateRelease", description FROM products';

  let haveParam = false;

  for (let i = 0; i < array.length; i++) {
    let param = currentURL.searchParams.getAll(array[i]);
    console.log(array[i] + " = " + param);
    let paramQuery = "";

    param.forEach((p, j) => {
      let tmp = "";
      if (array[i] === "price") {
        tmp += queryPriceMap[p];
      } else {
        tmp = tmp + "(" + array[i] + " = '" + p + "')";
      }
      if (j != param.length - 1) {
        tmp += " OR ";
      }
      paramQuery += tmp;
    });

    if (paramQuery !== "") {
      if (!haveParam) {
        query = query + " WHERE (" + paramQuery + ")";
        haveParam = true;
      } else {
        query = query + " AND (" + paramQuery + ")";
      }
    }
  }
  console.log(query);
  return query;
};

module.exports.makeQueryFilterProductsWithParams = makeQueryFilterProductsWithParams;
