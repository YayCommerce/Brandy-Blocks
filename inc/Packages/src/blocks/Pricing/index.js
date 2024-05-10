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
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "white" }}
    >
      <path
        d="M2.92326 10.8605L3.65641 5.76794C3.98951 3.45059 6.16564 1.94798 8.49661 2.4244L13.663 3.48068C14.7693 3.70719 15.7635 4.35823 16.4278 5.2922L20.4854 10.9968C21.8743 12.9495 21.4735 15.5815 19.5902 16.8751L13.6982 20.922C11.815 22.2155 9.16184 21.681 7.77292 19.7283L3.70815 14.0136C3.048 13.0855 2.76606 11.9532 2.92364 10.861L2.92326 10.8605Z"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        style={{ color: "white" }}
      />
      <path
        d="M11.2692 11.375C12.3857 10.6082 12.6512 9.08717 11.8622 7.9778C11.0731 6.86843 9.52835 6.59077 8.41181 7.35763C7.29527 8.12449 7.02978 9.64548 7.81882 10.7548C8.60786 11.8642 10.1526 12.1419 11.2692 11.375Z"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        style={{ color: "white" }}
      />
      <path
        d="M11.8896 17.3035L16.7417 13.9711"
        stroke="#0061FE"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        style={{ color: "white" }}
      />
    </svg>
  ),
});
