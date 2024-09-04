import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import Edit from "./Edit";

registerBlockType(metadata.name, {
  edit: Edit,
  icon: (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_36_39)" fill="transparent">
        <path
          d="M21.0238 8.32858L19.8333 9.47144L18.6429 8.32858"
          stroke="#2355F4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.3334 4.90002L19.4167 4.90002C19.5272 4.90002 19.6332 4.93244 19.7113 4.99015C19.7895 5.04785 19.8334 5.12611 19.8334 5.20772L19.8334 8.90002"
          stroke="#2355F4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <rect
        x="2.5"
        y="3"
        width="12"
        height="6"
        rx="2.5"
        stroke="#2355F4"
        stroke-width="1.5"
        stroke-linejoin="round"
        fill="transparent"
      />
      <rect
        x="2.5"
        y="14"
        width="19"
        height="7"
        rx="2.5"
        stroke="#2355F4"
        stroke-width="1.5"
        stroke-linejoin="round"
        fill="transparent"
      />
      <defs>
        <clipPath id="clip0_36_39">
          <rect
            width="8"
            height="5"
            fill="white"
            transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 21.5 10.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
});
