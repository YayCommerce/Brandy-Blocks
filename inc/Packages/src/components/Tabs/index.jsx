import { TabPanel } from "@wordpress/components";
import "./index.scss";

export default function BrandyTabs({ items }) {
  return (
    <TabPanel
      className="brandy-tab-panel"
      activeClass="active-tab"
      tabs={items}
    >
      {(tab) => tab.component}
    </TabPanel>
  );
}
