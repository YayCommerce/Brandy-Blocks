import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import AllInspectorSettings from "./InspectorControls";

import "../style.scss";

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  return (
    <>
      <InspectorControls>
        <AllInspectorSettings
          setAttributes={setAttributes}
          attributes={attributes}
          clientId={clientId}
        />
      </InspectorControls>
      <Content {...props} />
    </>
  );
}

export function Content(props) {
  const { isSave = false, context, attributes } = props;

  const {
    icon,
    iconHover,
    iconActive,
    backgroundColor,
    backgroundColorHover,
    backgroundColorActive,
    iconSize,
    loadingSpinnerColor,
  } = props.attributes;

  const dataProps = {
    "data-product-id": context?.postId ?? "",
    style: {
      "--atw-background-color": backgroundColor,
      "--atw-background-color-hover": backgroundColorHover,
      "--atw-background-color-active": backgroundColorActive,
      "--atw-icon-size": iconSize,
      "--atw-loading-spinner-color": loadingSpinnerColor,
    },
  };

  const blockProps = isSave
    ? useBlockProps.save(dataProps)
    : useBlockProps(dataProps);

  if (!isSave && (context?.postType !== "product" || !context?.postId)) {
    return <div {...blockProps}>There is no product found</div>;
  }

  return (
    <div {...blockProps}>
      <span className="wp-block-brandy-add-to-wishlist-loading"></span>
      <div className="wp-block-brandy-add-to-wishlist-icon-wrap">
        <img
          src={icon}
          className="wp-block-brandy-add-to-wishlist-icon default-state"
        />
        <img
          src={iconHover}
          className="wp-block-brandy-add-to-wishlist-icon hover-state"
        />
        <img
          src={iconActive}
          className="wp-block-brandy-add-to-wishlist-icon active-state"
        />
      </div>
      {(attributes.defaultText || attributes.addedText) && (
        <div className="wp-block-brandy-add-to-wishlist-text-wrap">
          {attributes.defaultText && (
            <span className="wp-block-brandy-add-to-wishlist-text default-state">
              {attributes.defaultText}
            </span>
          )}
          {attributes.addedText && (
            <span className="wp-block-brandy-add-to-wishlist-text active-state">
              {attributes.addedText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
