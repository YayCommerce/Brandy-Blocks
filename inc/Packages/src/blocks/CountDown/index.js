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
        d="M7.00516 16.04C6.51849 16.04 6.11516 15.94 5.79516 15.74C5.47516 15.54 5.23516 15.2667 5.07516 14.92C4.91516 14.5667 4.83516 14.16 4.83516 13.7V10.07C4.83516 9.59666 4.91182 9.18333 5.06516 8.82999C5.21849 8.46999 5.45516 8.18999 5.77516 7.98999C6.09516 7.78999 6.50516 7.68999 7.00516 7.68999C7.49849 7.68999 7.90182 7.78999 8.21516 7.98999C8.53516 8.18999 8.77182 8.46999 8.92516 8.82999C9.07849 9.18333 9.15516 9.59666 9.15516 10.07V13.7C9.15516 14.16 9.07516 14.5667 8.91516 14.92C8.75516 15.2667 8.51516 15.54 8.19516 15.74C7.87516 15.94 7.47849 16.04 7.00516 16.04ZM7.00516 14.68C7.18516 14.68 7.31516 14.6233 7.39516 14.51C7.47516 14.3967 7.52849 14.2633 7.55516 14.11C7.58182 13.95 7.59516 13.8033 7.59516 13.67V10.1C7.59516 9.95333 7.58182 9.79999 7.55516 9.63999C7.53516 9.47999 7.48516 9.34333 7.40516 9.22999C7.32516 9.10999 7.19182 9.04999 7.00516 9.04999C6.81849 9.04999 6.68182 9.10999 6.59516 9.22999C6.51516 9.34333 6.46182 9.47999 6.43516 9.63999C6.41516 9.79999 6.40516 9.95333 6.40516 10.1V13.67C6.40516 13.8033 6.41849 13.95 6.44516 14.11C6.47182 14.2633 6.52849 14.3967 6.61516 14.51C6.70182 14.6233 6.83182 14.68 7.00516 14.68Z"
        fill="#0061FE"
      />
      <rect
        x="2"
        y="4"
        width="10"
        height="16"
        rx="2"
        stroke="#0061FE"
        stroke-width="1.5"
        fill="transparent"
      />
      <g clip-path="url(#clip0_90_367)">
        <path
          d="M16.9286 9.90999C16.4286 9.90999 16.0286 9.83332 15.7286 9.67999C15.4286 9.51999 15.212 9.28665 15.0786 8.97999C14.9453 8.66665 14.8786 8.28665 14.8786 7.83999C14.8786 7.81999 14.8786 7.79999 14.8786 7.77999C14.8786 7.75999 14.8786 7.73999 14.8786 7.71999H16.3386C16.3386 8.05999 16.372 8.31332 16.4386 8.47999C16.512 8.64665 16.6786 8.72999 16.9386 8.72999C17.0986 8.72999 17.222 8.67999 17.3086 8.57999C17.3953 8.47999 17.4553 8.30999 17.4886 8.06999C17.522 7.82999 17.5386 7.50665 17.5386 7.09999V6.26999C17.4453 6.41665 17.3086 6.52999 17.1286 6.60999C16.9486 6.68999 16.742 6.73332 16.5086 6.73999C16.0753 6.74665 15.7286 6.64332 15.4686 6.42999C15.2086 6.20999 15.022 5.91665 14.9086 5.54999C14.802 5.18332 14.7486 4.77665 14.7486 4.32999C14.7486 3.77665 14.8186 3.29665 14.9586 2.88999C15.0986 2.48332 15.3286 2.16665 15.6486 1.93999C15.9753 1.71332 16.402 1.59999 16.9286 1.59999C17.442 1.59999 17.8586 1.70999 18.1786 1.92999C18.4986 2.14332 18.732 2.44332 18.8786 2.82999C19.0253 3.21665 19.0986 3.66999 19.0986 4.18999V7.13999C19.0986 7.66665 19.0386 8.13999 18.9186 8.55999C18.7986 8.97999 18.582 9.30999 18.2686 9.54999C17.9553 9.78999 17.5086 9.90999 16.9286 9.90999ZM16.9386 5.55999C17.092 5.55999 17.2153 5.51999 17.3086 5.43999C17.4086 5.35332 17.4853 5.26999 17.5386 5.18999V3.89999C17.5386 3.69332 17.522 3.50332 17.4886 3.32999C17.4553 3.15665 17.3953 3.01665 17.3086 2.90999C17.222 2.80332 17.0953 2.74999 16.9286 2.74999C16.762 2.74999 16.6353 2.80665 16.5486 2.91999C16.462 3.03332 16.402 3.19332 16.3686 3.39999C16.342 3.60665 16.3286 3.85665 16.3286 4.14999C16.3286 4.42332 16.3386 4.66665 16.3586 4.87999C16.3786 5.09332 16.4286 5.25999 16.5086 5.37999C16.5953 5.49999 16.7386 5.55999 16.9386 5.55999Z"
          fill="#0061FE"
        />
        <path
          d="M17.0019 19.92C16.4685 19.92 16.0419 19.8167 15.7219 19.61C15.4019 19.3967 15.1719 19.1 15.0319 18.72C14.8985 18.34 14.8319 17.9067 14.8319 17.42C14.8319 17.2 14.8519 16.9933 14.8919 16.8C14.9319 16.6067 14.9919 16.43 15.0719 16.27C15.1519 16.11 15.2485 15.97 15.3619 15.85C15.4819 15.7233 15.6219 15.62 15.7819 15.54C15.5619 15.38 15.3685 15.1567 15.2019 14.87C15.0419 14.5767 14.9585 14.2067 14.9519 13.76C14.9452 13.3133 15.0185 12.93 15.1719 12.61C15.3252 12.2833 15.5552 12.0333 15.8619 11.86C16.1685 11.6867 16.5485 11.6 17.0019 11.6C17.4619 11.6 17.8419 11.6867 18.1419 11.86C18.4485 12.0333 18.6752 12.2833 18.8219 12.61C18.9685 12.93 19.0385 13.3133 19.0319 13.76C19.0252 14.2133 18.9419 14.5867 18.7819 14.88C18.6285 15.1667 18.4385 15.3867 18.2119 15.54C18.3719 15.62 18.5085 15.7233 18.6219 15.85C18.7419 15.97 18.8419 16.11 18.9219 16.27C19.0019 16.43 19.0619 16.6067 19.1019 16.8C19.1485 16.9933 19.1719 17.2 19.1719 17.42C19.1852 17.9067 19.1185 18.34 18.9719 18.72C18.8319 19.1 18.6019 19.3967 18.2819 19.61C17.9685 19.8167 17.5419 19.92 17.0019 19.92ZM17.0019 18.77C17.1952 18.77 17.3385 18.7033 17.4319 18.57C17.5252 18.4367 17.5852 18.2733 17.6119 18.08C17.6385 17.8867 17.6519 17.7 17.6519 17.52C17.6585 17.3067 17.6452 17.1 17.6119 16.9C17.5852 16.7 17.5252 16.5367 17.4319 16.41C17.3385 16.2833 17.1952 16.22 17.0019 16.22C16.8152 16.22 16.6719 16.2833 16.5719 16.41C16.4785 16.5367 16.4152 16.7 16.3819 16.9C16.3552 17.0933 16.3419 17.3 16.3419 17.52C16.3419 17.7 16.3552 17.89 16.3819 18.09C16.4085 18.2833 16.4685 18.4467 16.5619 18.58C16.6619 18.7067 16.8085 18.77 17.0019 18.77ZM17.0019 14.96C17.1352 14.96 17.2419 14.91 17.3219 14.81C17.4085 14.71 17.4719 14.5667 17.5119 14.38C17.5519 14.1933 17.5719 13.9733 17.5719 13.72C17.5719 13.4333 17.5252 13.2033 17.4319 13.03C17.3452 12.85 17.2019 12.76 17.0019 12.76C16.8019 12.76 16.6519 12.85 16.5519 13.03C16.4585 13.2033 16.4119 13.43 16.4119 13.71C16.4119 13.9633 16.4285 14.1867 16.4619 14.38C16.5019 14.5667 16.5652 14.71 16.6519 14.81C16.7452 14.91 16.8619 14.96 17.0019 14.96Z"
          fill="#0061FE"
        />
      </g>
      <rect
        x="12"
        y="4"
        width="10"
        height="16"
        rx="2"
        stroke="#0061FE"
        stroke-width="1.5"
        fill="transparent"
      />
      <defs>
        <clipPath id="clip0_90_367">
          <rect
            width="10"
            height="16"
            fill="white"
            transform="translate(12 4)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
});
