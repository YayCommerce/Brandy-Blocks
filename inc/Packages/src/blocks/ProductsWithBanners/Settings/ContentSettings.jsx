import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ProductsWithBannersContext } from "../edit";
import { ToggleControl } from "@wordpress/components";

export default function ContentSettings() {
  const { attributes, setAttributes } = useContext(ProductsWithBannersContext);

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
          label={__("Product Image", "brandy")}
          checked={attributes.content_settings.showImage ?? true}
          onChange={handleChangeValue("showImage")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Category", "brandy")}
          checked={attributes.content_settings.showCategory ?? true}
          onChange={handleChangeValue("showCategory")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Title", "brandy")}
          checked={attributes.content_settings.showTitle ?? true}
          onChange={handleChangeValue("showTitle")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Rating", "brandy")}
          checked={attributes.content_settings.showRating ?? true}
          onChange={handleChangeValue("showRating")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Product Price", "brandy")}
          checked={attributes.content_settings.showPrice ?? true}
          onChange={handleChangeValue("showPrice")}
          className="brandy-product-show-hide-element"
        />
        <ToggleControl
          label={__("Add To Cart button", "brandy")}
          checked={attributes.content_settings.showAddToCart ?? true}
          onChange={handleChangeValue("showAddToCart")}
          className="brandy-product-show-hide-element"
        />
      </div>
    </>
  );
}
