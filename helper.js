const hbs = require("hbs");

hbs.registerHelper({
  showRating: rating => {
    let res = "";
    for (let i = 0; i < 5; i++) {
      if (i < rating) res += `<li><i class="fa fa-star"></i></li>`;
      else res += `<li class="no-star"><i class="fa fa-star"></i></li>`;
    }
    return res;
  },
  pagination: (pageCount, currentPage, pageRange, path) => {
    let res = "";
    if (currentPage > pageCount) return;

    let prevPageDisplay = 0,
      nextPageDisplay = 0;

    if (pageRange > pageCount) {
      prevPageDisplay = currentPage - 1;
      nextPageDisplay = pageCount - currentPage;
    } else {
      prevPageDisplay = Math.ceil((pageRange - 1) / 2.0);
      nextPageDisplay = Math.floor((pageRange - 1) / 2.0);

      let tmpPrev = 0,
        tmpNext = 0;

      if (prevPageDisplay > currentPage - 1) {
        tmpPrev = prevPageDisplay - (currentPage - 1);
        prevPageDisplay = currentPage - 1;
      }

      if (nextPageDisplay > pageCount - currentPage) {
        tmpNext = nextPageDisplay - (pageCount - currentPage);
        nextPageDisplay = pageCount - currentPage;
      }

      prevPageDisplay += tmpNext;
      nextPageDisplay += tmpPrev;
    }

    if (path.indexOf("?") == -1) {
      path += "?";
    } else {
      path += "&";
    }

    // Previous button
    if (prevPageDisplay > 0) {
      res += `<li class="paginationjs-prev"><a href="${path}page=${currentPage -
        1}">❮</a></li>`;
    } else {
      res += `<li class="paginationjs-prev disabled"><a>❮</a></li>`;
    }

    // Previous pages
    for (let i = 0; i < prevPageDisplay; i++) {
      let page = currentPage - prevPageDisplay + i;

      res += `<li class="paginationjs-page J-paginationjs-page"><a href="${path}page=${page}">${page}</a></li>`;
    }

    // Current page
    res += `<li class="paginationjs-page J-paginationjs-page active"><a>${currentPage}</a></li>`;

    // Next pages
    for (let i = 0; i < nextPageDisplay; i++) {
      let page = currentPage + 1 + i;
      res += `<li class="paginationjs-page J-paginationjs-page"><a href="${path}page=${page}">${page}</a></li>`;
    }

    // Next button
    if (nextPageDisplay > 0) {
      res += `<li class="paginationjs-next"><a href="${path}page=${currentPage +
        1}">❯</a></li>`;
    } else {
      res += `<li class="paginationjs-next disabled"><a>❯</a></li>`;
    }

    return res;
  }
});
