const { Pool } = require("pg");
const { URL } = require("url");
require("dotenv").config();

// Define query value mapping with price param
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

const querySortMap = {
  "name-asc": "name ASC",
  "name-desc": "name DESC",
  "price-asc": "price ASC",
  "price-desc": "price DESC",
  "rating-asc": "rating ASC",
  "rating-desc": "rating DESC",
  "date-asc": '"dateRelease" ASC',
  "date-desc": '"dateRelease" DESC'
};

// Database config
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL
});

// Convert data type "number" in PostgreSQL to number in Javascript
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// Standardized data got from database
function standardizedData(products) {
  // Old price
  products.rows.map(product => {
    product.price = formatNumber(
      Number(product.price.replace(/[^0-9.-]+/g, ""))
    );
  });

  // New price
  products.rows.map(product => {
    product.newPrice = formatNumber(
      Number(product.price.replace(/[^0-9.-]+/g, "")) *
        (1 - product.promote / 100)
    );
  });

  // Image
  products.rows.map(product => {
    product.images = product.path + "-1.jpg";
  });

  // Rating
  products.rows.map(product => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      if (i < product.rating) {
        arr.push("");
      } else {
        arr.push("no-star");
      }
    }
    product.rating = arr;
  });

  // New status
  products.rows.map(product => {
    let dateRelease = new Date(product.dateRelease.toString());
    let currentDate = new Date();
    let distance = Math.round(
      (currentDate - dateRelease) / (1000 * 60 * 60 * 24)
    );
    if (distance > 0 && distance <= 15) {
      product.new = "new";
    }
  });
}

const queryBuilder = async (urlWithParams, filteringParams, useSortParam) => {
  const url = new URL(urlWithParams);

  let query =
    'SELECT id, name, brand, price, promote, path, rating, "dateRelease", description FROM products WHERE 1 = 1';

  for (let i = 0; i < filteringParams.length; i++) {
    let param = url.searchParams.getAll(filteringParams[i]);
    console.log(filteringParams[i] + " = " + param);
    let paramQuery = "";

    param.forEach((p, j) => {
      let tmp = "";
      if (filteringParams[i] === "price") {
        tmp += queryPriceMap[p];
      } else {
        tmp = tmp + "(" + filteringParams[i] + " = '" + p + "')";
      }
      if (j != param.length - 1) {
        tmp += " OR ";
      }
      paramQuery += tmp;
    });

    if (paramQuery !== "") {
      query = query + " AND (" + paramQuery + ")";
    }
  }

  if (useSortParam) {
    if (url.searchParams.has("sort")) {
      query += " ORDER BY " + querySortMap[url.searchParams.get("sort")];
    } else {
      query += ' ORDER BY "dateRelease" DESC';
    }
  }

  return query;
};

const query = async query => {
  const data = await pool.query(query);
  standardizedData(data);
  return data.rows;
};

// Products showing on landing page

const getTop10NewProducts = async () => {
  const data = await pool.query(
    'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE (SELECT DATEDIFF(\'day\', "dateRelease"::timestamp, current_date::timestamp)) BETWEEN 0 AND 30 LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};

const getTop10BestSellerProducts = async () => {
  const data = await pool.query(
    'SELECT pr.name, pr.brand, pr.price, pr.promote, pr.path, pr.rating, "dateRelease" FROM products pr JOIN receipt_details rd ON pr.id = rd.id_product GROUP BY pr.id, pr.name, pr.brand, pr.price, pr.promote, pr.path, pr.rating HAVING SUM(rd.quantity) >= 5 LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};

const getTop10HighRatingProducts = async () => {
  const data = await pool.query(
    'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE rating >= 4 ORDER BY rating DESC LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};

const getTop10AppleProducts = async () => {
  const data = await pool.query(
    'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE brand = \'Apple\' ORDER BY "dateRelease" DESC LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};

const getProductDetails = async path => {
  const data = await pool.query(
    "SELECT * FROM products WHERE path = '" + path + "'"
  );
  standardizedData(data);
  return data.rows[0];
};

const getProductsByBrand = async brand => {
  const data = await pool.query(
    'SELECT id, name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE brand = \'' +
      brand +
      "'"
  );
  standardizedData(data);
  return data.rows;
};

module.exports.getTop10NewProducts = getTop10NewProducts;
module.exports.getTop10BestSellerProducts = getTop10BestSellerProducts;
module.exports.getTop10HighRatingProducts = getTop10HighRatingProducts;
module.exports.getTop10AppleProducts = getTop10AppleProducts;
module.exports.query = query;
module.exports.getProductDetails = getProductDetails;
module.exports.getProductsByBrand = getProductsByBrand;
module.exports.queryBuilder = queryBuilder;
