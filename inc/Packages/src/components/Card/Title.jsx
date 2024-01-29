import { DragIcon, InivisbleIcon, VisibleIcon } from "../Icons";
import "./Title.scss";

export default function Title({ title, onToggleVisible, visible = null }) {
  const handleVisibility = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleVisible();
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          className="item-block-drag-handler"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DragIcon />
        </span>
        <span>{title}</span>
      </span>
      {visible != null && (
        <span
          className={`item-block-visible-icon ${
            visible ? "icon-visible" : "icon-invisible"
          }`}
          style={{ padding: 5, cursor: "pointer", display: "flex" }}
          onClick={handleVisibility}
        >
          {visible ? <VisibleIcon /> : <InivisbleIcon />}
        </span>
      )}
    </div>
  );
}
