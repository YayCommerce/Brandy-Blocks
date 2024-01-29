import { BaseControl } from "@wordpress/components";

export default function Label({ title, style }) {
  return (
    <BaseControl.VisualLabel className="setting__label" style={style}>{title}</BaseControl.VisualLabel>
  );
}
