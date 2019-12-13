// Define query value mapping with params
const priceQueryMap = {
  "2000000": "(price::money::numeric::float8 < 2000000)",
  "2000000-4000000":
    "(price::money::numeric::float8 BETWEEN 2000000 AND 4000000)",
  "4000000-7000000":
    "(price::money::numeric::float8 BETWEEN 4000000 AND 7000000)",
  "7000000-13000000":
    "(price::money::numeric::float8 BETWEEN 7000000 AND 13000000)",
  "13000000": "(price::money::numeric::float8 > 13000000)"
};

const sortQueryMap = {
  "name-asc": "name ASC",
  "name-desc": "name DESC",
  "price-asc": "price ASC",
  "price-desc": "price DESC",
  "rating-asc": "rating ASC",
  "rating-desc": "rating DESC",
  "date-asc": '"dateRelease" ASC',
  "date-desc": '"dateRelease" DESC'
};

// Get pool connection
const pool = require("../configs/database");

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

// *** DATA SHOWING ON LANDING PAGE ***
module.exports.getTop10NewProducts = async () => {
  const data = await pool.query(
    'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE (SELECT DATEDIFF(\'day\', "dateRelease"::timestamp, current_date::timestamp)) BETWEEN 0 AND 30 LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};

module.exports.getTop10BestSellerProducts = async () => {
  const data = await pool.query(
    'SELECT pr.name, pr.brand, pr.price, pr.promote, pr.path, pr.rating, "dateRelease" FROM products pr JOIN receipt_details rd ON pr.id = rd.id_product GROUP BY pr.id, pr.name, pr.brand, pr.price, pr.promote, pr.path, pr.rating HAVING SUM(rd.quantity) >= 5 LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};

module.exports.getTop10HighRatingProducts = async () => {
  const data = await pool.query(
    'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE rating >= 4 ORDER BY rating DESC LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};

module.exports.getTop10AppleProducts = async () => {
  const data = await pool.query(
    'SELECT name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE brand = \'Apple\' ORDER BY "dateRelease" DESC LIMIT 10'
  );
  standardizedData(data);
  return data.rows;
};
// ***

// *** DATA SHOWING ON PRODUCTS PAGE ***
// Get products from query object
module.exports.getProductsByQueryObject = async queryObj => {
  const filteringParams = ["brand", "price"];

  // Initialize default query string
  let query =
    'SELECT id, name, brand, price, promote, path, rating, "dateRelease", description FROM products WHERE (1 = 1)';

  let queryCountTotal = "SELECT COUNT(*) FROM products WHERE (1 = 1)";

  // Loop to build filtering condition
  filteringParams.forEach(paramKey => {
    if (queryObj[paramKey] !== undefined) {
      let paramValues = [].concat(queryObj[paramKey]);

      let paramQuery = "(1 = 0)";

      paramValues.forEach(paramValue => {
        paramQuery += " OR ";
        if (paramKey === "price") paramQuery += priceQueryMap[paramValue];
        else paramQuery += `(${paramKey} = '${paramValue}')`;
      });

      query += ` AND (${paramQuery})`;
      queryCountTotal += ` AND (${paramQuery})`;
    }
  });

  // Build ordering option
  if (queryObj.sort !== undefined) {
    query += " ORDER BY " + sortQueryMap[queryObj.sort];
  } else {
    query += ' ORDER BY "dateRelease" DESC'; // Default is ordering by newest date release
  }

  // Build paging
  const pageSize = 6;

  if (queryObj.page !== undefined) {
    query += " OFFSET " + (queryObj.page - 1) * pageSize;
  }

  query += " LIMIT " + pageSize;

  //
  const countTotal = await pool.query(queryCountTotal);

  let result = {};

  result.totalItems = Number(countTotal.rows[0].count);

  const data = await pool.query(query);
  standardizedData(data);

  result.data = data.rows;

  return result;
};
// ***

// *** DATA SHOWING ON SPECIFIC PRODUCT PAGE ***
module.exports.getProductDetails = async path => {
  const data = await pool.query(
    "SELECT * FROM products WHERE path = '" + path + "'"
  );
  standardizedData(data);
  return data.rows[0];
};

module.exports.getProductsByBrand = async brand => {
  const data = await pool.query(
    `SELECT id, name, brand, price, promote, path, rating, "dateRelease" FROM products WHERE brand = '${brand}'`
  );
  standardizedData(data);
  return data.rows;
};
// ***

module.exports.countProductsByBrand = async brand => {
  const data = await pool.query(
    `SELECT COUNT(*) FROM products WHERE brand = '${brand}'`
  );
  return data.rows[0].count;
};
