export function updateOriginalPriceStyles(attributes) {
  const typography = attributes.originalPriceTypography;
  const fontWeight = typography.appearance.style.fontWeight;
  const fontStyle = typography.appearance.style.fontStyle;

  const styles = `font-size: ${typography.fontSize} !important; font-weight: ${fontWeight} !important; font-style: ${fontStyle}; color: ${typography.color} !important`;

  const productPrice = jQuery(".wp-block-woocommerce-product-price");

  productPrice.each(function () {
    const delTag = jQuery(this).find(
      "del.wc-block-components-product-price__regular"
    );
    if (delTag.length > 0) {
      delTag.attr("style", styles);
    }
  });
}
