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
        d="M16.4433 4.02153C15.3648 3.90899 14.2113 4.23723 13.1421 5.01564C12.3168 5.61586 11.6322 6.30049 11.3039 6.65686C11.182 6.77878 10.9851 6.77878 10.8632 6.65686C10.5349 6.30049 9.85029 5.61586 9.02499 5.01564C6.60536 3.27126 3.83873 3.80583 2.31943 6.40365C1.01583 8.65447 1.91615 11.0178 3.66054 12.8935L9.70024 19.4021C10.4411 20.1993 11.7072 20.1993 12.4481 19.4021L18 13"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="transparent"
      />
      <path
        d="M20.0151 5.17505V10.3689"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.621 7.77173H17.4093"
        stroke="#0061FE"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
});
