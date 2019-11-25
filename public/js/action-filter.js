// Initialized
let brandSelected = [];
let priceSelected = [];

let invertMap = {
  "2000000": "Dưới 2 triệu",
  "2000000-4000000": "Từ 2 - 4 triệu",
  "4000000-7000000": "Từ 4 - 7 triệu",
  "7000000-13000000": "Từ 7 - 13 triệu",
  "13000000": "Trên 13 triệu"
};

function updateFilterData() {
  let url = "/products";
  let brandParams = [];
  for (let i = 0; i < brandSelected.length; i++) {
    let pair = ["brand", brandSelected[i]];
    brandParams.push(pair);
  }

  brandParams = new URLSearchParams(brandParams).toString();

  let map = {
    "Dưới 2 triệu": "2000000",
    "Từ 2 - 4 triệu": "2000000-4000000",
    "Từ 4 - 7 triệu": "4000000-7000000",
    "Từ 7 - 13 triệu": "7000000-13000000",
    "Trên 13 triệu": "13000000"
  };

  let priceParams = [];
  for (let i = 0; i < priceSelected.length; i++) {
    let pair = ["price", map[priceSelected[i]]];
    priceParams.push(pair);
  }

  priceParams = new URLSearchParams(priceParams).toString();

  if (brandParams !== "" || priceParams !== "") url = url + "?";
  url = url + brandParams;
  if (priceParams !== "") url = url + "&";
  url = url + priceParams;

  history.pushState({ url: url }, "", url);
  $("#productFieldGrid").load(url + " #productFieldGrid > *", function() {
    showProducts("#productFieldGrid");
  });
  $("#productFieldList").load(url + " #productFieldList > *", function() {
    showProducts("#productFieldList");
  });
  let loading = `<p class="container p-5" style="height: 50vh;">Đang lọc sản phẩm...</p>`;
  $("#view-more-button").addClass("d-none");
  $("#productFieldGrid").html(loading);
  $("#productFieldList").html(loading);
}

$(document).ready(function() {
  // INIT CURRENT FILTER STATE INTERFACE WHEN PAGE RELOAD
  const currentURL = new URL(window.location.href.toString()); // Get current URL after page reloaded

  brandSelected = currentURL.searchParams.getAll("brand"); // Get all values of "brand" key into array brandSelected
  priceSelected = currentURL.searchParams
    .getAll("price") // Get all values of "price" key into array priceSelected
    .map(e => invertMap[e]); // Get inner text from price value

  // Checked all brand checkboxes match with value from URL
  let checkboxes = document.querySelectorAll("input.brand");
  checkboxes.forEach(checkbox => {
    brandSelected.forEach(b => {
      if (checkbox.value === b) {
        checkbox.checked = true;
      }
    });
  });

  // Add filter labels match with value from URL
  brandSelected.forEach(b => {
    let labelFilter =
      `<button class="btn-clear-all mb-sm-30 mb-xs-30">` + b + `</button>`;
    $(".label-filter-wrap").append(labelFilter);

    const buttons = document.querySelectorAll(
      "button.btn-clear-all.mb-sm-30.mb-xs-30"
    );
    buttons.forEach(button => {
      button.addEventListener("click", e => {
        button.remove();

        brandSelected = brandSelected.filter(e => e !== button.textContent);
        updateFilterData();

        const checkboxes = document.querySelectorAll("input.brand");
        checkboxes.forEach(checkbox => {
          if (checkbox.value === button.textContent) {
            checkbox.checked = false;
          }
        });
      });
    });
  });

  // Checked all price checkboxes match with value from URL
  checkboxes = document.querySelectorAll("input.price");
  checkboxes.forEach(checkbox => {
    priceSelected.forEach(p => {
      if (checkbox.value == p) {
        checkbox.checked = true;
      }
    });
  });

  // Add filter labels match with value from URL
  priceSelected.forEach(p => {
    let labelFilter =
      `<button class="btn-clear-all mb-sm-30 mb-xs-30">` + p + `</button>`;
    $(".label-filter-wrap").append(labelFilter);
    const buttons = document.querySelectorAll(
      "button.btn-clear-all.mb-sm-30.mb-xs-30"
    );
    buttons.forEach(button => {
      button.addEventListener("click", e => {
        button.remove();

        priceSelected = priceSelected.filter(e => e !== button.textContent);
        updateFilterData();

        const checkboxes = document.querySelectorAll("input.price");
        checkboxes.forEach(checkbox => {
          if (checkbox.value === button.textContent) {
            checkbox.checked = false;
          }
        });
      });
    });
  });

  showProducts("#productFieldGrid");
  showProducts("#productFieldList");

  //////////////////////////////////////////////////////////////////

  $("#brand-form input[type=checkbox]").on("change", function() {
    let brand = $(this).val();
    if ($(this).prop("checked")) {
      let labelFilter =
        `<button class="btn-clear-all mb-sm-30 mb-xs-30">` +
        brand +
        `</button>`;
      $(".label-filter-wrap").append(labelFilter);

      brandSelected.push(brand);

      const buttons = document.querySelectorAll(
        "button.btn-clear-all.mb-sm-30.mb-xs-30"
      );
      buttons.forEach(button => {
        button.addEventListener("click", e => {
          button.remove();

          brandSelected = brandSelected.filter(e => e !== button.textContent);
          updateFilterData();

          const checkboxes = document.querySelectorAll("input.brand");
          checkboxes.forEach(checkbox => {
            if (checkbox.value === button.textContent) {
              checkbox.checked = false;
            }
          });
        });
      });
      updateFilterData();
    } else {
      $('.label-filter-wrap button:contains("' + brand + '")').remove();
      brandSelected = brandSelected.filter(e => e !== brand);
      updateFilterData();
    }
  });

  $("#price-form input[type=checkbox]").on("change", function() {
    let price = $(this).val();
    if ($(this).prop("checked")) {
      let labelFilter =
        `<button class="btn-clear-all mb-sm-30 mb-xs-30">` +
        price +
        `</button>`;
      $(".label-filter-wrap").append(labelFilter);

      priceSelected.push(price);

      const buttons = document.querySelectorAll(
        "button.btn-clear-all.mb-sm-30.mb-xs-30"
      );
      buttons.forEach(button => {
        button.addEventListener("click", e => {
          button.remove();

          priceSelected = priceSelected.filter(e => e !== button.textContent);
          updateFilterData();

          const checkboxes = document.querySelectorAll("input.price");
          checkboxes.forEach(checkbox => {
            if (checkbox.value === button.textContent) {
              checkbox.checked = false;
            }
          });
        });
      });
      updateFilterData();
    } else {
      $('.label-filter-wrap button:contains("' + price + '")').remove();
      priceSelected = priceSelected.filter(e => e !== price);
      updateFilterData();
    }
  });
});
