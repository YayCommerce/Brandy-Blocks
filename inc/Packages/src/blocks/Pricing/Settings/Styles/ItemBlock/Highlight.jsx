import { __ } from "@wordpress/i18n";
import Title from "../../../../../components/Card/Title";

export default function Highlight() {
  return (
    <div className="brandy-collapse-menu styles-card">
      <div className="brandy-collapse-menu__header">
        <span className="collapse-title">
          <Title title={__("Highlight badge", "brandy")} />
        </span>
      </div>
    </div>
  );
}
