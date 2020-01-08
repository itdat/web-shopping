function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

// Get Cart object from local storage
const getCartDetailsLS = function() {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  return cart;
};

// Add product to cart (one by one)
const addToCartLS = function(path, price) {
  let cart = getCartDetailsLS();

  if (cart[path] == null) {
    cart[path] = {
      quantity: 1,
      price: Number(price.replace(/[^0-9]/g, ""))
    };
  } else {
    cart[path].quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Minus product from cart (one by one)
const minusFromCartLS = function(path) {
  let cart = getCartDetailsLS();
  if (cart[path] != null) {
    if (cart[path].quantity > 1) {
      cart[path].quantity -= 1;
    } else {
      delete cart[path];
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Get total amount from cart
const getTotalLS = function() {
  let cart = getCartDetailsLS();

  let total = 0;

  Object.keys(cart).forEach(key => {
    total += cart[key].quantity * cart[key].price;
  });

  return total;
};

const removeFromCartLS = function(path) {
  let cart = getCartDetailsLS();

  if (cart[productPath] != null) {
    delete cart[productPath];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Event listener on click button "Add to cart"
$(".add-cart.active").on("click", function(e) {
  e.preventDefault();

  const $target = $(e.target);
  const path = $target.attr("data-target-path");
  const price = $target.attr("data-target-price");

  // Post data to add
  $.post(`/shopping-cart/add/${path}`, function(data) {}).fail(function(err) {
    addToCartLS(path, price);
    $("#totalCartAmount").text(formatNumber(getTotalLS()) + "₫");
  });
});

// $(document).ready(function() {
//   if (getCartDetailsLS() != {}) {
//     $("#totalCartAmount").text(formatNumber(getTotalLS()) + "₫");

//     if ($("#totalCartAmount").attr("data-login-status") === "true") {
//       $.post("/shopping-cart/force-update", getCartDetailsLS(), function(data) {
//         alert("ABC");
//       });
//     }
//   }
// });
