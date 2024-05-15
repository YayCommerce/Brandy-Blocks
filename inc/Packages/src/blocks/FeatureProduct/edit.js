import { useBlockProps } from "@wordpress/block-editor";
import { createContext, useMemo } from "@wordpress/element";
import ServerSideRender from "@wordpress/server-side-render";
import Settings from "./Settings";
import metadata from "./block.json";

export const ProductContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();
  const dataAttributes = useMemo(
    () => ({
      product_id:
        attributes.product_id ??
        parseInt(metadata.attributes.product_id.default),
      content_settings:
        attributes.content_settings ?? metadata.attributes.content_settings,
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
    <div {...blockProps}>
      <ProductContext.Provider value={contextValue}>
        <Settings />
        <ServerSideRender
          block="brandy/feature-product"
          LoadingResponsePlaceholder={Loader}
          attributes={dataAttributes}
        />
      </ProductContext.Provider>
    </div>
  );
}

function Loader() {
  return "Loading...";
}
