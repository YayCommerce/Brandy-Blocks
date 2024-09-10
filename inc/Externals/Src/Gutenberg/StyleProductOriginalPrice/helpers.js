export function loadOriginalPriceStyles(clientId, attributes) {
  const typography = attributes.originalPriceTypography;
  const fontWeight = typography.appearance.style.fontWeight;
  const fontStyle = typography.appearance.style.fontStyle;

  const styles = `font-size: ${typography.fontSize} !important; font-weight: ${fontWeight} !important; font-style: ${fontStyle}; color: ${typography.color} !important`;

  let productPrice = null;

  if (jQuery("iframe").length === 0) {
    productPrice = jQuery(`#block-${clientId}`);
  } else {
    const iframe = jQuery("iframe")[0];
    productPrice = jQuery(iframe).contents().find(`#block-${clientId}`);
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
}
