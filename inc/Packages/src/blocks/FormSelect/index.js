import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import Save from "./save";
import Edit from "./Edit";

registerBlockType(metadata.name, {
  edit: Edit,
  save: Save,
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
});
