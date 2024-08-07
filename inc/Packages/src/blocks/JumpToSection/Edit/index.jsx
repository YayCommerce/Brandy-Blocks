import {
  BlockControls,
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import AllBlockControls from "./BlockControls";
import AllInspectorSettings from "./InspectorControls";
import { getExtraDOMAttributes, getWrapperDOMAttributes } from "../utils";

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  const blockProps = useBlockProps(getExtraDOMAttributes(attributes));

  const innerBlocksProps = useInnerBlocksProps(
    getWrapperDOMAttributes(attributes),
    {
      template: [
        [
          "core/group",
          {
            style: {
              color: {
                background: "#0c0c0c",
              },
              spacing: {
                padding: {
                  top: "12px",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                },
              },
              border: {
                radius: "100px",
              },
            },
          },
          [
            [
              "core/image",
              {
                url: "http://img.wpbrandy.com/uploads/srcoll-top-icon.png",
                width: "24px",
                height: "24px",
              },
            ],
          ],
        ],
      ],
    }
  );

  return (
    <>
      <InspectorControls>
        <AllInspectorSettings
          setAttributes={setAttributes}
          attributes={attributes}
          clientId={clientId}
        />
      </InspectorControls>
      <BlockControls>
        <AllBlockControls
          clientId={clientId}
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </BlockControls>
      <div {...blockProps}>
        {attributes.display === "fixed" && (
          <span style={{ color: "#757575", fontSize: "14px" }}>
            [{__("Jump to section placeholder", "brandy-blocks")}]
          </span>
        )}
        <div {...innerBlocksProps}></div>
      </div>
    </>
  );
}
