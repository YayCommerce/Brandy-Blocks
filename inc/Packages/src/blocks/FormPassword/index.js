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
        d="M6 9H7V15H6"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 9H7V15H8"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
});
