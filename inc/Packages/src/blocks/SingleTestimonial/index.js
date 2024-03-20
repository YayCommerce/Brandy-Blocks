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
        d="M20.9116 7.53174C20.881 7.14732 20.8547 6.92766 20.8547 6.92766C20.8547 4.20509 18.5699 2 15.7537 2H8.10103C5.51225 2 3.3717 3.86292 3.04373 6.27923C3.01531 6.49256 3 6.70799 3 6.92977V12.3496V12.7762C3 13.5936 3.20553 14.3646 3.57067 15.0426C4.41902 16.6246 6.13102 17.7039 8.10103 17.7039H15.2661C15.3624 18.8821 15.002 20.2775 14.7213 21.1509C14.6011 21.5248 14.9203 21.9087 15.296 21.7941C17.4053 21.1504 18.7547 19.5878 19.6063 17.7039C20.4371 15.8684 20.7957 13.7309 20.9313 11.8448C21.0624 9.97972 20.9772 8.36604 20.9116 7.53174Z"
        fill="white"
        stroke="#00A3FE"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <path
        d="M11.9978 13.6C10.0271 13.6 8.24694 12.5895 7.56758 11.0862C7.39245 10.6994 7.56951 10.2482 7.96211 10.0757C8.35279 9.90317 8.81276 10.0776 8.98789 10.4643C9.42091 11.4255 10.6314 12.0701 11.9978 12.0701C13.37 12.0701 14.5806 11.4217 15.0117 10.4568C15.1849 10.07 15.6429 9.89559 16.0355 10.0643C16.4281 10.2349 16.6071 10.6861 16.4339 11.0729C15.7584 12.5838 13.9763 13.6 11.9978 13.6Z"
        fill="#00A3FE"
      />
    </svg>
  ),
});
