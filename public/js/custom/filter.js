let priceMap = {
  "2000000": "Dưới 2 triệu",
  "2000000-4000000": "Từ 2 - 4 triệu",
  "4000000-7000000": "Từ 4 - 7 triệu",
  "7000000-13000000": "Từ 7 - 13 triệu",
  "13000000": "Trên 13 triệu"
};

const initFilterState = () => {
  let url = new URL(window.location.href);

  let brandSelected = url.searchParams.getAll("brand");
  let priceSelected = url.searchParams.getAll("price").map(e => priceMap[e]);

  brandSelected.forEach(brand => {
    // Append filtering labels
    let labelFilter = `<button class="brand-btn btn-clear-all mb-sm-30 mb-xs-30">${brand}</button>`;
    $(".label-filter-wrap").append(labelFilter);

    // Check checkboxes
    $("#brand-form")
      .find(`input[value='${brand}']`)
      .attr("checked", true);
  });

  priceSelected.forEach(price => {
    // Append filtering labels
    let labelFilter = `<button class="price-btn btn-clear-all mb-sm-30 mb-xs-30">${price}</button>`;
    $(".label-filter-wrap").append(labelFilter);

    // Check checkboxes
    $("#price-form")
      .find(`input[value='${price}']`)
      .attr("checked", true);
  });
};

$(document).ready(function() {
  // Initialize state
  initFilterState();

  // Event listener on check checkboxes
  $("input[type=checkbox]").on("change", function(e) {
    $target = $(e.target);
    const inForm = $target
      .parent()
      .parent()
      .parent()
      .attr("id");
    if (inForm === "brand-form" || inForm === "price-form") {
      let value = $(this).val();
      if ($(this).prop("checked")) {
        let labelFilter;

        if (inForm === "brand-form") {
          labelFilter = `<button class="brand-btn btn-clear-all mb-sm-30 mb-xs-30">${value}</button>`;
          addParamToURL("brand", value);
        }
        if (inForm === "price-form") {
          labelFilter = `<button class="price-btn btn-clear-all mb-sm-30 mb-xs-30">${value}</button>`;
          addParamToURL("price", getKeyByValue(priceMap, value));
        }

        $(".label-filter-wrap").append(labelFilter);
      } else {
        $(`.label-filter-wrap button:contains("${value}")`).remove();
        if (inForm === "brand-form") removeParamFromURL("brand", value);
        if (inForm === "price-form")
          removeParamFromURL("price", getKeyByValue(priceMap, value));
      }
      removeParamFromURL("page");
      updateData();
    }
  });

  // Event listener on click filtering label
  $(".label-filter-wrap").on("click", function(e) {
    $target = $(e.target);
    if ($target.hasClass("btn-clear-all mb-sm-30 mb-xs-30")) {
      // Uncheck checkboxes
      $(".sidebar-categores-box")
        .find(`input[value='${$target.text()}']`)
        .attr("checked", false);

      // Remove button
      $target.remove();

      // Update data
      if ($target.hasClass("brand-btn"))
        removeParamFromURL("brand", $target.text());
      if ($target.hasClass("price-btn"))
        removeParamFromURL("price", getKeyByValue(priceMap, $target.text()));

      removeParamFromURL("page");
      updateData();
    }
  });
});
