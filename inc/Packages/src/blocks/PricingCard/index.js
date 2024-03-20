import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import "./style.scss";

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
        d="M2.92326 10.8606L3.65641 5.76806C3.98951 3.45071 6.16564 1.9481 8.49661 2.42452L13.663 3.4808C14.7693 3.70731 15.7635 4.35836 16.4278 5.29232L20.4854 10.9969C21.8743 12.9496 21.4735 15.5817 19.5902 16.8752L13.6982 20.9221C11.815 22.2156 9.16184 21.6811 7.77292 19.7284L3.70815 14.0138C3.048 13.0856 2.76606 11.9533 2.92364 10.8611L2.92326 10.8606Z"
        stroke="#00A3FE"
        fill="#ffffff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.2692 11.3752C12.3857 10.6083 12.6512 9.08735 11.8622 7.97798C11.0731 6.86861 9.52835 6.59096 8.41181 7.35782C7.29527 8.12468 7.02978 9.64566 7.81882 10.755C8.60786 11.8644 10.1526 12.1421 11.2692 11.3752Z"
        stroke="#00A3FE"
        fill="#ffffff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.8896 17.3037L16.7417 13.9713"
        stroke="#00A3FE"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
});
