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
});
