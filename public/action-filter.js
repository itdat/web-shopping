$(document).ready(function() {
  var selected = [];

  $("#brand-form input[type=checkbox]").on("change", function() {
    let brand = $(this).val();
    if ($(this).prop("checked")) {
      let labelFilter =
        `<button class="btn-clear-all mb-sm-30 mb-xs-30">` +
        brand +
        `</button>`;
      $(".label-filter-wrap").append(labelFilter);

      const buttons = document.querySelectorAll(
        "button.btn-clear-all.mb-sm-30.mb-xs-30"
      );
      buttons.forEach(button => {
        button.addEventListener("click", e => {
          button.remove();
          const checkboxes = document.querySelectorAll("input.brand");
          checkboxes.forEach(checkbox => {
            if (checkbox.value === button.textContent) {
              checkbox.checked = false;
            }
          });
        });
      });
    } else {
      $('.label-filter-wrap button:contains("' + brand + '")').remove();
    }
  });
});
