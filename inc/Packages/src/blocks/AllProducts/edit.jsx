import { useBlockProps } from "@wordpress/block-editor";
import { createContext } from "@wordpress/element";
import ServerSideRender from "@wordpress/server-side-render";

export const PricingContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps} className={blockProps.className + " block-upgraded"}>
      <ServerSideRender
        block="brandy/all-products"
        LoadingResponsePlaceholder={Loader}
      />
    </div>
  );
}

function Loader() {
  return "Loading...";
}
