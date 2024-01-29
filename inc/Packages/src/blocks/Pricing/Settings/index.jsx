import { InspectorControls } from "@wordpress/block-editor";
import { GeneralIcon, StylesIcon } from "../../../components/Icons";
import BrandyTabs from "../../../components/Tabs";
import General from "./General";
import Styles from "./Styles";

const tabItems = [
  {
    name: "tab1",
    className: "tab-one",
    icon: GeneralIcon,
    component: General,
  },
  {
    name: "tab2",
    className: "tab-two",
    icon: StylesIcon,
    component: Styles,
  },
];

export default function Settings() {
  return (
    <InspectorControls>
      <div className="brandy-editor pricing-settings">
        <BrandyTabs items={tabItems} />
      </div>
    </InspectorControls>
  );
}
