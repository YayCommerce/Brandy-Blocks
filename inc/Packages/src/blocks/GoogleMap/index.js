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
      <path
        d="M17 8C17 10.7667 12 17.4445 12 17.4445C12 17.4445 7 10.7667 7 8C7 6.67392 7.52678 5.40215 8.46447 4.46447C9.40215 3.52678 10.6739 3 12 3C13.3261 3 14.5979 3.52678 15.5355 4.46447C16.4732 5.40215 17 6.67392 17 8V8Z"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="transparent"
      />
      <path
        d="M12 9.66668C12.9205 9.66668 13.6667 8.92049 13.6667 8.00001C13.6667 7.07954 12.9205 6.33334 12 6.33334C11.0795 6.33334 10.3333 7.07954 10.3333 8.00001C10.3333 8.92049 11.0795 9.66668 12 9.66668Z"
        fill="#0061FE"
      />
      <path
        d="M6.5 13.5H5C3.34315 13.5 2 14.8431 2 16.5V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V16.5C22 14.8431 20.6569 13.5 19 13.5H17.5"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="transparent"
      />
    </svg>
  ),
});
