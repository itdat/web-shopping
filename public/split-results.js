function showProducts(parent) {
  $(parent + " .item-hide:lt(15)").removeClass("item-hide");
  console.log("Left products: ", $(parent + " .item-hide").length);
  if ($(parent + " .item-hide").length > 0) {
    $("#view-more-button").removeClass("d-none");
    $("#view-more-button").removeAttr("disabled");
  } else {
    $("#view-more-button").addClass("d-none");
  }
}

$(document).ready(function() {
  $("#view-more-button").on("click", function() {
    $("#productFieldGrid .item-hide:lt(15)").removeClass("item-hide");
    if ($("#productFieldGrid .item-hide").length == 0) {
      $("#view-more-button").attr("disabled", "disabled");
    }

    $("#productFieldList .item-hide:lt(15)").removeClass("item-hide");
    if ($("#productFieldList .item-hide").length == 0) {
      $("#view-more-button").attr("disabled", "disabled");
    }
  });
});
