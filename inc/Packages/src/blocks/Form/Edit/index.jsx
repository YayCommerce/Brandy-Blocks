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

const DEFAULT_TEMPLATE = [
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
];

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
    template: DEFAULT_TEMPLATE,
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
      <ul style={{ display: "flex", gap: 10 }}>
        {fieldsToSelect.map((f) => (
          <li key={f.name}>
            <Tooltip text={f.tooltip}>
              <Button
                onClick={() => {
                  handleAddField(f.name);
                }}
                icon={f.icon}
                iconSize={35}
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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="#0061FE"
          stroke-width="1.5"
          stroke-linejoin="round"
          fill="transparent"
        />
        <path
          d="M10.2 8.39996V8.39996C11.1941 8.39996 12 9.20585 12 10.2V13.8C12 14.7941 11.1941 15.6 10.2 15.6V15.6"
          stroke="#0061FE"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="transparent"
        />
        <path
          d="M13.8 8.40002V8.40002C12.8059 8.40002 12 9.20591 12 10.2V13.8C12 14.7941 12.8059 15.6 13.8 15.6V15.6"
          stroke="#0061FE"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="transparent"
        />
      </svg>
    ),
  },
  {
    name: "brandy/form-email",
    tooltip: "Add a form email",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="#0061FE"
          stroke-width="1.5"
          stroke-linejoin="round"
          fill="transparent"
        />
        <path
          d="M14.401 13.1332C14.401 13.5712 14.5255 13.7459 14.851 13.7459C15.5766 13.7459 16.0385 12.8203 16.0385 11.2809C16.0385 8.92793 14.326 7.80152 12.188 7.80152C9.98854 7.80152 7.98802 9.27837 7.98802 12.0694C7.98802 14.7352 9.73802 16.187 12.4255 16.187C13.338 16.187 13.9505 16.0869 14.8875 15.774L15.0885 16.612C14.1635 16.9129 13.175 17 12.413 17C8.88802 17 7 15.0601 7 12.0688C7 9.05257 9.18802 7 12.2005 7C15.338 7 17 8.87735 17 11.1802C17 13.1327 16.388 14.622 14.463 14.622C13.5875 14.622 13.013 14.2716 12.938 13.4951C12.713 14.3587 12.113 14.622 11.3 14.622C10.2125 14.622 9.3 13.783 9.3 12.0939C9.3 10.3917 10.1005 9.34043 11.538 9.34043C12.3005 9.34043 12.7755 9.6408 12.987 10.1164L13.35 9.45307H14.4V13.1332H14.401ZM12.8641 11.4811C12.8641 10.7933 12.351 10.5049 11.926 10.5049C11.4635 10.5049 10.9516 10.8798 10.9516 11.9817C10.9516 12.8578 11.3391 13.346 11.926 13.346C12.3385 13.346 12.8641 13.0831 12.8641 12.3572V11.4811Z"
          fill="#0061FE"
        />
      </svg>
    ),
  },
  {
    name: "brandy/form-phone",
    tooltip: "Add a form phone",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="#0061FE"
          stroke-width="1.5"
          stroke-linejoin="round"
          fill="transparent"
        />
        <path
          d="M13.9979 16C13.6107 15.965 13.276 15.8763 12.9492 15.756C12.1689 15.468 11.4763 15.0307 10.8358 14.5068C9.94265 13.7762 9.19635 12.9196 8.63161 11.9113C8.33856 11.388 8.11828 10.8364 8.01481 10.2415C7.98344 10.0608 7.99779 9.89948 8.09792 9.74049C8.46573 9.15654 8.88928 8.62091 9.42097 8.17528C9.45501 8.14695 9.49306 8.12329 9.52911 8.09762C9.74139 7.9463 9.91394 7.97863 10.1299 8.14129C10.1606 8.16428 10.189 8.19328 10.211 8.22461C10.5845 8.7499 10.9446 9.28386 11.2126 9.87282C11.248 9.95081 11.273 10.0335 11.2984 10.1155C11.3458 10.2685 11.3188 10.4134 11.2106 10.5274C11.0811 10.6641 10.9393 10.7894 10.7971 10.9137C10.6129 11.0751 10.6085 11.0734 10.7053 11.2994C11.1212 12.27 11.8221 12.9469 12.8067 13.3325C12.8928 13.3662 12.9472 13.3642 13.0096 13.2842C13.1258 13.1356 13.2543 12.9966 13.3821 12.8572C13.549 12.6756 13.7539 12.6203 13.9792 12.7233C14.2512 12.8476 14.5243 12.9749 14.7809 13.1272C15.11 13.3229 15.4244 13.5432 15.7428 13.7565C15.8723 13.8435 15.9505 13.9685 15.9885 14.1208C16.0092 14.2041 16.0032 14.2828 15.9605 14.3538C15.9051 14.4465 15.85 14.5418 15.7792 14.6221C15.322 15.1411 14.7919 15.5734 14.1932 15.92C14.1231 15.9607 14.0416 15.9817 13.9976 15.999L13.9979 16Z"
          fill="#0061FE"
        />
      </svg>
    ),
  },
  {
    name: "brandy/form-options",
    tooltip: "Add a checkbox or Radio input",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="3"
          width="7"
          height="7"
          rx="2"
          stroke="#0061FE"
          stroke-width="1.5"
          fill="transparent"
        />
        <rect x="13" y="6" width="9" height="1" rx="0.5" stroke="#0061FE" />
        <path
          d="M4.2 6.6875L4.97037 7.5L6.86666 5.5"
          stroke="#0061FE"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="2"
          y="13"
          width="7"
          height="7"
          rx="2"
          stroke="#0061FE"
          stroke-width="1.5"
          fill="transparent"
        />
        <rect
          width="9"
          height="1"
          rx="0.5"
          transform="matrix(1 0 0 -1 13 18)"
          stroke="#0061FE"
        />
        <path
          d="M4.2 16.6875L4.97037 17.5L6.86666 15.5"
          stroke="#0061FE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "brandy/form-select",
    tooltip: "Add a dropdown",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="6"
          width="20"
          height="12"
          rx="2"
          stroke="#0061FE"
          stroke-width="1.5"
          stroke-linejoin="round"
          fill="transparent"
        />
        <path
          d="M16.2121 13.2879C16.095 13.405 15.905 13.405 15.7879 13.2879L13.5121 11.0121C13.3231 10.8231 13.457 10.5 13.7243 10.5L18.2757 10.5C18.543 10.5 18.6769 10.8231 18.4879 11.0121L16.2121 13.2879Z"
          fill="#0061FE"
        />
      </svg>
    ),
  },
  {
    name: "brandy/form-submit",
    tooltip: "Add submit button",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 12.4371V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.79996C6.11979 3 5.27971 3 4.63797 3.32698C4.07348 3.6146 3.61454 4.07354 3.32692 4.63803C2.99994 5.27976 2.99994 6.11984 2.99994 7.8V16.2C2.99994 17.8802 2.99994 18.7202 3.32692 19.362C3.61454 19.9265 4.07348 20.3854 4.63797 20.673C5.27971 21 6.11979 21 7.79996 21H12.437"
          stroke="#0061FE"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="transparent"
        />
        <path
          d="M18.0809 18.2988L16.9425 20.4129C16.7565 20.7584 16.6634 20.9312 16.55 20.9763C16.4516 21.0154 16.3404 21.0057 16.2503 20.9501C16.1464 20.886 16.0847 20.6997 15.9614 20.3272L14.1357 14.8134C14.0277 14.4871 13.9736 14.324 14.0125 14.2153C14.0463 14.1208 14.1207 14.0464 14.2153 14.0126C14.3239 13.9737 14.487 14.0277 14.8133 14.1358L20.3271 15.9614C20.6997 16.0848 20.886 16.1465 20.9501 16.2503C21.0057 16.3405 21.0153 16.4517 20.9762 16.5501C20.9312 16.6635 20.7584 16.7565 20.4128 16.9426L18.2988 18.0809C18.2461 18.1092 18.2198 18.1235 18.1967 18.1416C18.1763 18.1578 18.1578 18.1763 18.1416 18.1968C18.1234 18.2198 18.1092 18.2462 18.0809 18.2988Z"
          fill="#0061FE"
        />
        <path
          d="M7.99994 3.5V4.5C7.99994 5.05228 8.44765 5.5 8.99994 5.5H14.9999C15.5522 5.5 15.9999 5.05228 15.9999 4.5V3.5"
          stroke="#0061FE"
          stroke-width="1.5"
          fill="transparent"
        />
      </svg>
    ),
  },
];
