function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

exports.getCardInfo = function(products) {
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

  // New
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
};
