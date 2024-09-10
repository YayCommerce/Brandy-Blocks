import React, { useEffect } from "react";
import CustomSettings from "./components/CustomSettings";
import { loadOriginalPriceStyles } from "./helpers";

/** Register attribute */
function addWooProductPriceBlockAttribute(settings, name) {
  if (settings.attributes == undefined) {
    return settings;
  }

  if ("woocommerce/product-price" === name) {
    settings.attributes = Object.assign(settings.attributes, {
      originalPriceTypography: {
        type: "object",
        default: {
          fontSize: "",
          color: "",
          appearance: {
            key: "default",
            name: "Default",
            style: {
              fontWeight: "default",
              fontStyle: "default",
            },
          },
        },
      },
    });
  }

  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  "brandy-blocks/woo-product-original-price-attributes",
  addWooProductPriceBlockAttribute
);

/** Display controls */
const StylePriceControls = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      const { Fragment } = wp.element;
      const { attributes, setAttributes, name, clientId, isSelected } = props;

      if ("woocommerce/product-price" === name) {
        useEffect(() => {
          loadOriginalPriceStyles(clientId, attributes);
        }, []);
      }


      return (
        <Fragment>
          <BlockEdit {...props} />
          {isSelected && "woocommerce/product-price" === name && (
            <CustomSettings
              attributes={attributes}
              setAttributes={setAttributes}
              clientId={clientId}
            />
          )}
        </Fragment>
      );
    };
  },
  "stylePriceControls"
);

wp.hooks.addFilter(
  "editor.BlockEdit",
  "brandy-blocks/woo-product-original-price-controls",
  StylePriceControls
);
