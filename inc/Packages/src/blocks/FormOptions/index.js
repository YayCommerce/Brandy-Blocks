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
});
