(function ($) {
  $(document).ready(function () {
    function beforeFetching(rootElement) {
      $(rootElement)[0].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      $(rootElement)
        .find("li.product")
        .replaceWith(
          window.brandyBlocks.blocks?.allProducts?.templates
            ?.product_placeholder ?? ""
        );
    }
    function fetchRendered(attributes) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: window.brandyBlocks.ajax.path,
          type: "POST",
          data: {
            action: "brandy_blocks_all_products_render_list",
            nonce: window.brandyBlocks.blocks.allProducts.nonces.render_list,
            attributes,
          },
          success: function (response) {
            resolve(response);
          },
          error: function (response) {
            reject(response);
          },
        });
      });
    }

    function getTotalPages(root) {
      return $(root).find(".page-number").length;
    }

    function getPage(el) {
      return $(el).data("page") ?? 1;
    }

    function getCurrentPage(root) {
      const currentPageEl = $(root).find(".current-page");
      return getPage(currentPageEl);
    }

    function changeButtonStatus(root, page) {
      const totalPages = getTotalPages(root);
      $(root)
        .find(".page-number")
        .each((_, el) => {
          $(el).removeClass("current-page");
          $(el).removeAttr("disabled");
          if (getPage(el) == page) {
            $(el).addClass("current-page");
            $(el).attr("disabled", "");
          }
        });

      $(root).find(".brandy-block-pagination--arrow").removeAttr("disabled");
      if (page == 1) {
        $(root)
          .find(".brandy-block-pagination--arrow.previous-arrow")
          .attr("disabled", "");
      }
      if (page == totalPages) {
        $(root)
          .find(".brandy-block-pagination--arrow.next-arrow")
          .attr("disabled", "");
      }
    }

    $(".brandy-block-all-products").each((_, root) => {
      $(root)
        .find(".brandy-block-all-products__sort > select")
        .on("change", function (e) {
          beforeFetching(root);
          changeButtonStatus(root, 1);
          const attributes = {
            ...($(root).data("settings") ?? {}),
            order_by: e.target.value,
          };
          fetchRendered(attributes).then((res) => {
            if (res.success && res.data?.rendered) {
              $(root)
                .find(".brandy-product-list")
                .replaceWith(res.data.rendered);
            }
          });
        });

      $(root)
        .find(".brandy-block-pagination-page")
        .on("click", function (e) {
          beforeFetching(root);
          const currentPage = getCurrentPage(root);
          const totalPages = getTotalPages(root);
          let nextPage = Math.min(totalPages, currentPage + 1);
          let previousPage = Math.max(currentPage - 1, 1);
          let targetPage;
          if ($(this).hasClass("brandy-block-pagination--arrow")) {
            if ($(this).hasClass("previous-arrow")) {
              targetPage = previousPage;
            } else {
              targetPage = nextPage;
            }
          } else {
            targetPage = getPage(this);
          }
          changeButtonStatus(root, targetPage);
          const attributes = {
            ...($(root).data("settings") ?? {}),
            page: targetPage,
          };
          fetchRendered(attributes).then((res) => {
            if (res.success && res.data?.rendered) {
              $(root)
                .find(".brandy-product-list")
                .replaceWith(res.data.rendered);
            }
          });
        });
    });
  });
})(window.jQuery);
