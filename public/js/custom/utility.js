const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

const addParamToURL = (name, value, replace) => {
  // Get current URL
  let url = new URL(window.location.href);
  let searchParams = new URLSearchParams(url.search);

  if (replace) searchParams.set(name, value);
  else searchParams.append(name, value);

  url.search = searchParams.toString();
  url = url.toString();

  history.pushState({ url: url }, "", url);
};

const removeParamFromURL = (name, value) => {
  // Get current URL
  let url = new URL(window.location.href);
  let searchParams = new URLSearchParams(url.search);

  if (value === undefined) {
    searchParams.delete(name);
  } else {
    let arr = searchParams.getAll(name);
    searchParams.delete(name);
    arr = arr.filter(v => v != value);

    arr.forEach(v => {
      searchParams.append(name, v);
    });
  }

  url.search = searchParams.toString();
  url = url.toString();

  history.pushState({ url: url }, "", url);
};

const updateData = () => {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(".shop-top-bar").offset().top - 50
    },
    300
  );

  $("#productFieldGrid > *").fadeTo("slow", 0.3);
  $.get(window.location.href, function(data) {
    const $data = $(data);
    $("#productFieldGrid")
      .html($data.find("#productFieldGrid > *"))
      .fadeTo("slow", 1);
    $("#productFieldList")
      .html($data.find("#productFieldList > *"))
      .fadeTo("slow", 1);
    $("#products-pagination").html($data.find("#products-pagination > *"));
    $(".toolbar-amount").html($data.find(".toolbar-amount > *"));
  });
};
