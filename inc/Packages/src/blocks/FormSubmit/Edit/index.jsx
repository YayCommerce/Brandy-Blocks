import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import AllInspectorSettings from "./InspectorControls";

import "../style.scss";

export default function Edit(props) {
  return (
    <>
      <InspectorControls>
        <AllInspectorSettings {...props} />
      </InspectorControls>
      <Content {...props} />
    </>
  );
}

export function Content({ isSave = false }) {
  const blockProps = isSave ? useBlockProps.save() : useBlockProps();

  const innerConfig = {
    template: [
      [
        "core/button",
        {
          text: "Submit",
          type: "submit",
          tagName: "button",
        },
      ],
    ],
    renderAppender: false,
    templateLock: true,
  };

  const innerBlockProps = isSave
    ? useInnerBlocksProps.save(blockProps, innerConfig)
    : useInnerBlocksProps(blockProps, innerConfig);

  return <div {...innerBlockProps}></div>;
}
