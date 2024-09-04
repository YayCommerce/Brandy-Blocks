import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useSelect, dispatch } from "@wordpress/data";
import { Placeholder, Button, Tooltip } from "@wordpress/components";
import { createBlock } from "@wordpress/blocks";
import { View } from "@wordpress/primitives";
import { __ } from "@wordpress/i18n";

import "../style.scss";

import AllInspectorSettings from "./InspectorControls";

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  const blockProps = useBlockProps();

  const showPlaceholder = useSelect((select) => {
    return select("core/editor").getBlock(clientId)?.innerBlocks.length < 1;
  });

  let renderAppender;
  if (showPlaceholder) {
    renderAppender = false;
  }

  const ALLOWED_BLOCKS = wp.blocks
    .getBlockTypes()
    .map((block) => block.name)
    .filter((blockName) => blockName !== "brandy/form");

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: [
      [
        "brandy/form-input",
        {
          label: "Username",
          name: "username",
          id: "username",
        },
      ],
      [
        "brandy/form-password",
        {
          label: "User password",
          name: "password",
          id: "password",
        },
      ],
      ["brandy/form-submit"],
    ],
    renderAppender,
    allowedBlocks: ALLOWED_BLOCKS,
  });

  return (
    <>
      <InspectorControls>
        <AllInspectorSettings
          setAttributes={setAttributes}
          attributes={attributes}
          clientId={clientId}
        />
      </InspectorControls>
      {!showPlaceholder ? (
        <div {...innerBlocksProps} />
      ) : (
        <View>
          {innerBlocksProps.children}
          <EmptyPlaceholder {...props} />
        </View>
      )}
    </>
  );
}

function EmptyPlaceholder(props) {
  const { clientId } = props;
  const handleAddField = (name = "brandy/form-input") => {
    const block = createBlock(name);
    dispatch("core/block-editor").insertBlocks(block, 0, clientId, true);
  };

  return (
    <Placeholder instructions={__("Your form is empty. Add a field:")}>
      <ul style={{ display: "flex", gap: 20 }}>
        {fieldsToSelect.map((f) => (
          <li key={f.name}>
            <Tooltip text={f.tooltip}>
              <Button
                onClick={() => {
                  handleAddField(f.name);
                }}
                icon={f.icon}
              />
            </Tooltip>
          </li>
        ))}
      </ul>
    </Placeholder>
  );
}

const fieldsToSelect = [
  {
    name: "brandy/form-input",
    tooltip: "Add a form input",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z"></path>
      </svg>
    ),
  },
  {
    name: "brandy/form-email",
    tooltip: "Add a form email",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 10a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm25 0a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2V10Z"></path>
      </svg>
    ),
  },
  {
    name: "brandy/form-phone",
    tooltip: "Add a form phone",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 10a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm25 0a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2V10Z"></path>
      </svg>
    ),
  },
  {
    name: "brandy/form-options",
    tooltip: "Add a checkbox or Radio input",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 10a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm25 0a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2V10Z"></path>
      </svg>
    ),
  },
  {
    name: "brandy/form-select",
    tooltip: "Add a dropdown",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 10a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm25 0a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2V10Z"></path>
      </svg>
    ),
  },
];
