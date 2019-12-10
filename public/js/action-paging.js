function paging(fieldID, paginationID) {
  const listItems = $(fieldID)
    .children()
    .toArray();
  $(paginationID).pagination({
    dataSource: listItems,
    pageSize: 6,
    afterPageOnClick: function() {
      const paginationCurrent = $(paginationID);
      const pageNum = paginationCurrent.pagination("getSelectedPageNum");
      const paginationGrid = $("#pagination-grid");
      const paginationList = $("#pagination-list");
      paginationGrid.pagination("go", pageNum);
      paginationList.pagination("go", pageNum);
    },
    afterNextOnClick: function() {
      const paginationCurrent = $(paginationID);
      const pageNum = paginationCurrent.pagination("getSelectedPageNum");
      const paginationGrid = $("#pagination-grid");
      const paginationList = $("#pagination-list");
      paginationGrid.pagination("go", pageNum);
      paginationList.pagination("go", pageNum);
    },
    afterPreviousOnClick: function() {
      const paginationCurrent = $(paginationID);
      const pageNum = paginationCurrent.pagination("getSelectedPageNum");
      const paginationGrid = $("#pagination-grid");
      const paginationList = $("#pagination-list");
      paginationGrid.pagination("go", pageNum);
      paginationList.pagination("go", pageNum);
    },
    callback: function(data, pagination) {
      $(fieldID)
        .children()
        .remove();
      data.forEach(item => {
        $(fieldID).append(item);
      });

      $(".begin").text(1 + (pagination.pageNumber - 1) * pagination.pageSize);
      $(".end").text(
        data.length + (pagination.pageNumber - 1) * pagination.pageSize
      );
      $(".total").text(pagination.totalNumber);

      if (
        $("#productFieldGrid").has("div p:contains('Không tìm thấy kết quả')")
          .length != 0
      ) {
        $(".begin").text(0);
        $(".end").text(0);
        $(".total").text(0);
      }
    }
  });
}
