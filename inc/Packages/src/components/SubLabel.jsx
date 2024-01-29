import { BaseControl } from "@wordpress/components";

export default function SubLabel({ title, style }) {
  return (
    <BaseControl.VisualLabel className="setting__sub-label" style={style}>
      {title}
    </BaseControl.VisualLabel>
  );
}
