import { useBlockProps } from "@wordpress/block-editor";
import { createContext, useMemo } from "@wordpress/element";
import ServerSideRender from "@wordpress/server-side-render";
import Settings from "./Settings";
import metadata from "./block.json";

export const ProductsWithBannersContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();

  const dataAttributes = useMemo(
    () => ({
      banner_settings:
        attributes.banner_settings ?? metadata.attributes.banner_settings,
      content_settings:
        attributes.content_settings ?? metadata.attributes.content_settings,
      product_category_settings:
        attributes.product_category_settings ??
        metadata.attributes.product_category_settings,
    }),
    [attributes]
  );

  const contextValue = useMemo(
    () => ({
      attributes: dataAttributes,
      setAttributes,
    }),
    [dataAttributes, setAttributes]
  );

  return (
    <div {...blockProps} className={blockProps.className + " block-upgraded"}>
      <ProductsWithBannersContext.Provider value={contextValue}>
        <Settings />
        <ServerSideRender
          block="brandy/products-with-banners"
          LoadingResponsePlaceholder={Loader}
          attributes={dataAttributes}
        />
      </ProductsWithBannersContext.Provider>
    </div>
  );
}

function Loader() {
  return "Loading...";
}
