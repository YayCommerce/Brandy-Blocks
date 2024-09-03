(function ($) {
  $(document).ready(() => {
    $("[data-original-price-typography]").each((_, el) => {
      const data = jQuery(el).attr("data-original-price-typography");

      // Parse the JSON string into a JavaScript object
      const styleObject = JSON.parse(data);

      // Access the individual properties
      const fontSize = styleObject.fontSize;
      const color = styleObject.color;
      const fontWeight = styleObject.fontWeight;

      //Apply style
      const styles = `font-size: ${fontSize} !important; font-weight: ${fontWeight} !important; color: ${color} !important`;
      const delTag = jQuery(el).find(
        "div.wc-block-components-product-price del"
      );
      if (delTag.length > 0) {
        delTag.attr("style", styles);
      }
    });
  });
})(window.jQuery);
