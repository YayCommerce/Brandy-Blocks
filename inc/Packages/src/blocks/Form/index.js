import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import Save from "./save";
import Edit from "./Edit";

registerBlockType(metadata.name, {
  edit: Edit,
  save: Save,
  icon: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        rx="3"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linejoin="round"
        fill="transparent"
      />
      <path
        d="M6 1.5V2.5C6 3.05228 6.44772 3.5 7 3.5H13C13.5523 3.5 14 3.05228 14 2.5V1.5"
        stroke="#0061FE"
        stroke-width="1.5"
        fill="transparent"
      />
      <path
        d="M6.22647 13.3376C6.29082 12.9111 6.49131 12.5168 6.79804 12.2136L11.6728 7.39461C12.2051 6.86846 13.0686 6.86846 13.6008 7.39461C14.1331 7.92077 14.1331 8.77438 13.6008 9.30054L8.72883 14.1168C8.46126 14.3813 8.12451 14.565 7.75725 14.6467L6.18663 14.9962C6.08241 15.0195 5.98564 14.9312 6.00177 14.827L6.22647 13.3376Z"
        fill="#0061FE"
      />
    </svg>
  ),
});
