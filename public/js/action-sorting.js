function updateSortingData(sortOption) {
  let url = new URL(window.location.href);

  let searchParams = new URLSearchParams(url.search);

  if (searchParams.has("sort")) {
    searchParams.set("sort", sortOption);
  } else {
    searchParams.append("sort", sortOption);
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
  let loading = `<p class="container p-5" style="height: 50vh;">Đang sắp xếp sản phẩm...</p>`;
  $("#productFieldGrid").html(loading);
  $("#productFieldList").html(loading);
}

$("select#sort-products").on("change", function(e) {
  const optionSelected = $("option:selected", this);
  updateSortingData(optionSelected.val());
});

$(document).ready(function() {
  let url = new URL(window.location.href);

  let searchParams = new URLSearchParams(url.search);

  if (searchParams.has("sort")) {
    const optionSelected = searchParams.get("sort");
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
});
