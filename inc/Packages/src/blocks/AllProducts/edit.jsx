import { useBlockProps } from "@wordpress/block-editor";
import { createContext, useMemo } from "@wordpress/element";
import ServerSideRender from "@wordpress/server-side-render";
import Settings from "./Settings";
import metadata from "./block.json";

export const AllProductsContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();

  const dataAttributes = useMemo(
    () => ({
      layout_settings:
        attributes.layout_settings ?? metadata.attributes.layout_settings,
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
      <AllProductsContext.Provider value={contextValue}>
        <Settings />
        <ServerSideRender
          block="brandy/all-products"
          LoadingResponsePlaceholder={Loader}
          attributes={dataAttributes}
        />
      </AllProductsContext.Provider>
    </div>
  );
}

function Loader() {
  return "Loading...";
}
