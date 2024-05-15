import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ProductContext } from "../edit";
import { ToggleControl } from "@wordpress/components";

export default function ContentSettings() {
  const { attributes, setAttributes } = useContext(ProductContext);

  const handleChangeValue = (key) => (value) => {
    setAttributes({
      content_settings: {
        ...attributes.content_settings,
        [key]: Boolean(value),
      },
    });
  };

  return (
    <>
      <div className="brandy-product-settings-wrapper">
        <ToggleControl
            label={__("Product Image","brandy")}
            checked={attributes.content_settings.show_image ?? true}
            onChange={handleChangeValue("show_image")}
            className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Category","brandy")}
          checked={attributes.content_settings.show_category ?? true}
          onChange={handleChangeValue("show_category")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Title","brandy")}
          checked={attributes.content_settings.show_title ?? true}
          onChange={handleChangeValue("show_title")}
          className="brandy-product-show-hide-element"
        />
         <ToggleControl
          label={__("Rating","brandy")}
          checked={attributes.content_settings.show_rating ?? true}
          onChange={handleChangeValue("show_rating")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Price","brandy")}
          checked={attributes.content_settings.show_price ?? true}
          onChange={handleChangeValue("show_price")}
          className="brandy-product-show-hide-element"
        />
         <ToggleControl
          label={__("Add To Cart button","brandy")}
          checked={attributes.content_settings.show_add_to_cart ?? true}
          onChange={handleChangeValue("show_add_to_cart")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Meta","brandy")}
          checked={attributes.content_settings.show_meta ?? true}
          onChange={handleChangeValue("show_meta")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Short Description","brandy")}
          checked={attributes.content_settings.show_short_desc ?? true}
          onChange={handleChangeValue("show_short_desc")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Tags","brandy")}
          checked={attributes.content_settings.show_tag ?? true}
          onChange={handleChangeValue("show_tag")}
          className="brandy-product-show-hide-element"
        />
      </div>
    </>
  );
}
