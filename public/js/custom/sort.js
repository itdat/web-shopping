// Init state
const initSortState = () => {
  let url = new URL(window.location.href);

  if (url.searchParams.has("sort")) {
    const optionSelected = url.searchParams.get("sort");
    $("#sort-products option:selected").removeAttr("selected");
    $(`#sort-products option[value=${optionSelected}]`).attr(
      "selected",
      "selected"
    );
    const innerText = $("#sort-products option:selected").text();

    $(".nice-select span.current").text(innerText);

    $(".nice-select li.selected").removeClass("selected");
    $(".nice-select li.focus").removeClass("focus");

    $(`.nice-select li:contains(${innerText})`)
      .addClass("selected")
      .addClass("focus");
  }
};

$(document).ready(function() {
  // Initialize state
  initSortState();

  // Event listener on change select opiton
  $("select#sort-products").on("change", function(e) {
    const optionSelected = $("option:selected", this);
    removeParamFromURL("page");
    addParamToURL("sort", optionSelected.val(), true);
    updateData();
  });
});
