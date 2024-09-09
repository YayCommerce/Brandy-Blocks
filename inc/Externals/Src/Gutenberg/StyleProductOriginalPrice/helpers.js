export function updateOriginalPriceStyles(attributes) {
  const typography = attributes.originalPriceTypography;
  const fontWeight = typography.appearance.style.fontWeight;
  const fontStyle = typography.appearance.style.fontStyle;

  const styles = `font-size: ${typography.fontSize} !important; font-weight: ${fontWeight} !important; font-style: ${fontStyle}; color: ${typography.color} !important`;

  let productPrice = null;

  if (jQuery("iframe").length === 0) {
    productPrice = jQuery(".wp-block-woocommerce-product-price");
  } else {
    const iframe = jQuery("iframe")[0];
    productPrice = jQuery(iframe)
      .contents()
      .find(".wp-block-woocommerce-product-price");
  }

  if (null !== productPrice) {
    productPrice.each(function () {
      const delTag = jQuery(this).find(
        "del.wc-block-components-product-price__regular"
      );

      if (delTag.length > 0) {
        delTag.attr("style", styles);
      }
    });
  }

  // Add MutationObserver to track changes
  const targetNode = document.querySelector(
    ".brandy-original-price-settings-panel"
  );
  if (targetNode) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          const newStyles = targetNode.getAttribute("style");
          if (newStyles) {
            if (null !== productPrice) {
              productPrice.each(function () {
                const delTag = jQuery(this).find(
                  "del.wc-block-components-product-price__regular"
                );
                if (delTag.length > 0) {
                  delTag.attr("style", newStyles);
                }
              });
            }
          }
        }
      });
    });

    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }
}
