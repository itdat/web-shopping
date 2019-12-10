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

function updateFilteringData() {
  let url = new URL(window.location.href);

  let searchParams = new URLSearchParams(url.search);
  searchParams.delete("brand");
  searchParams.delete("price");

  for (let i = 0; i < brandSelected.length; i++) {
    searchParams.append("brand", brandSelected[i]);
  }

  let map = {
    "Dưới 2 triệu": "2000000",
    "Từ 2 - 4 triệu": "2000000-4000000",
    "Từ 4 - 7 triệu": "4000000-7000000",
    "Từ 7 - 13 triệu": "7000000-13000000",
    "Trên 13 triệu": "13000000"
  };

  for (let i = 0; i < priceSelected.length; i++) {
    searchParams.append("price", map[priceSelected[i]]);
  }

  url.search = searchParams.toString();
  url = url.toString();

  history.pushState({ url: url }, "", url);
  $("#productFieldGrid").load(url + " #productFieldGrid > *", function() {
    paging("#productFieldGrid", "#pagination-grid");
  });
  $("#productFieldList").load(url + " #productFieldList > *", function() {
    paging("#productFieldList", "#pagination-list");
  });
  let loading = `<p class="container p-5 text-center" style="height: 50vh;">Đang lọc sản phẩm...</p>`;
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
        updateFilteringData();

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
        updateFilteringData();

        const checkboxes = document.querySelectorAll("input.price");
        checkboxes.forEach(checkbox => {
          if (checkbox.value === button.textContent) {
            checkbox.checked = false;
          }
        });
      });
    });
  });

  paging("#productFieldGrid", "#pagination-grid");
  paging("#productFieldList", "#pagination-list");

  const paginationGrid = $("#pagination-grid");

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
          updateFilteringData();

          const checkboxes = document.querySelectorAll("input.brand");
          checkboxes.forEach(checkbox => {
            if (checkbox.value === button.textContent) {
              checkbox.checked = false;
            }
          });
        });
      });
      updateFilteringData();
    } else {
      $('.label-filter-wrap button:contains("' + brand + '")').remove();
      brandSelected = brandSelected.filter(e => e !== brand);
      updateFilteringData();
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
          updateFilteringData();

          const checkboxes = document.querySelectorAll("input.price");
          checkboxes.forEach(checkbox => {
            if (checkbox.value === button.textContent) {
              checkbox.checked = false;
            }
          });
        });
      });
      updateFilteringData();
    } else {
      $('.label-filter-wrap button:contains("' + price + '")').remove();
      priceSelected = priceSelected.filter(e => e !== price);
      updateFilteringData();
    }
  });

  /////////////////////////////////////////////////////////////////
});
