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
        d="M8 3.5V4.5C8 5.05228 8.44772 5.5 9 5.5H15C15.5523 5.5 16 5.05228 16 4.5V3.5"
        stroke="#0061FE"
        stroke-width="1.5"
        fill="transparent"
      />
      <path
        d="M8.22647 15.3376C8.29082 14.9111 8.49131 14.5168 8.79804 14.2136L13.6728 9.39461C14.2051 8.86846 15.0686 8.86846 15.6008 9.39461C16.1331 9.92077 16.1331 10.7744 15.6008 11.3005L10.7288 16.1168C10.4613 16.3813 10.1245 16.565 9.75725 16.6467L8.18663 16.9962C8.08241 17.0195 7.98564 16.9312 8.00177 16.827L8.22647 15.3376Z"
        fill="#0061FE"
      />
    </svg>
  ),
});
