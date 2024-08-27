import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import "./style.scss";
import Edit from "./Edit";
import Save from "./save";

registerBlockType(metadata.name, {
  edit: Edit,
  save: Save,
  icon: (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 9H16"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8 12H16"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8 15H12"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M16.5 3H8.5C5.7 3 3.5 5.2 3.5 8V15C3.5 17.8 5.7 20 8.5 20H10.5L12.5 22L14.5 20H16.5C19.3 20 21.5 17.8 21.5 15V8C21.5 5.2 19.3 3 16.5 3Z"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linejoin="round"
        fill="transparent"
      />
    </svg>
  ),
});
