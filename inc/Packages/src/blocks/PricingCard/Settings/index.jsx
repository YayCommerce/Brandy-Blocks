import { InspectorControls } from "@wordpress/block-editor";
import ListFeatures from "./ListFeatures";

export default function Settings() {
  return (
    <InspectorControls key="setting">
      <div className="brandy-editor pricing-settings">
        <ListFeatures />
      </div>
    </InspectorControls>
  );
}
