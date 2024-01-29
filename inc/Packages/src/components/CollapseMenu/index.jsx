import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import "./index.scss";

export default function CollapseMenu({
  initialStatus = false,
  title = __("Menu title", "brandy"),
  className = "",
  children,
}) {
  const [open, setOpen] = useState(initialStatus);
  return (
    <div
      className={`brandy-collapse-menu ${
        open ? "collapse-open" : ""
      } ${className}`}
    >
      <div
        className="brandy-collapse-menu__header"
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        <span className="collapse-title">{title}</span>
        <span className="collapse-arrow">
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 2.15974L5.5 6.87402L0 2.15974L0.9 0.874023L5.5 4.73117L10 0.874023L11 2.15974Z"
              fill="#C6D4E1"
            />
          </svg>
        </span>
      </div>
      {open && <div className="brandy-collapse-menu__content">{children}</div>}
    </div>
  );
}
