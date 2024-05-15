import { useBlockProps } from "@wordpress/block-editor";
import { createContext, useMemo } from "@wordpress/element";
import ServerSideRender from "@wordpress/server-side-render";
import Settings from "./Settings";
import metadata from "./block.json";

export const RelativePostsContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();

  const dataAttributes = useMemo(
    () => ({
      posts_query: attributes.posts_query ?? metadata.attributes.posts_query,
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
      <RelativePostsContext.Provider value={contextValue}>
        <Settings />
        <ServerSideRender
          block="brandy/relative-posts"
          LoadingResponsePlaceholder={Loader}
          attributes={dataAttributes}
        />
      </RelativePostsContext.Provider>
    </div>
  );
}

function Loader() {
  return "Loading...";
}
