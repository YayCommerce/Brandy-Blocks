import useViewport from "../../hooks/useViewport";
import { useState, useEffect, useRef } from "@wordpress/element";
import "./index.scss";

const options = [
  {
    value: "Desktop",
    label: <DesktopIcon />,
  },
  {
    value: "Tablet",
    label: <TabletIcon />,
  },
  {
    value: "Mobile",
    label: <MobileIcon />,
  },
];

export default function ViewportSwitcher() {
  const { viewport, setViewport } = useViewport();
  const handleSelect = (value) => {
    setViewport(value);
  };
  const [open, setOpen] = useState(false);

  const switcherRef = useRef(null);

  useEffect(() => {
    function clickOutside(ev) {
      if (
        switcherRef.current != null &&
        !switcherRef.current.contains(ev.target)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("click", clickOutside);

    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [switcherRef.current]);

  return (
    <div className="viewport-switcher">
      <div
        className="current-viewport viewport-item"
        ref={switcherRef}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {options.find((i) => i.value === viewport).label}
      </div>
      <div className={`viewport-modal ${open ? "opened" : ""}`}>
        <div className="viewport-list">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                handleSelect(option.value);
              }}
              className={`viewport-item ${
                viewport === option.value ? "selected" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopIcon() {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3 0H1.7C0.76245 0 0 0.755368 0 1.68421V10.9474C0 11.8762 0.76245 12.6316 1.7 12.6316H7.65V14.3158H5.1V16H11.9V14.3158H9.35V12.6316H15.3C16.2376 12.6316 17 11.8762 17 10.9474V1.68421C17 0.755368 16.2376 0 15.3 0ZM1.7 10.5V1.68421H15.3L15.3017 10.5H8.50085H1.7Z"
        fill="#A1ABB7"
      />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0H4C2.9 0 2 0.9 2 2V14C2 15.1 2.9 16 4 16H14C15.1 16 16 15.1 16 14V2C16 0.9 15.1 0 14 0ZM14.5 14C14.5 14.3 14.3 14.5 14 14.5H4C3.7 14.5 3.5 14.3 3.5 14V2C3.5 1.7 3.7 1.5 4 1.5H14C14.3 1.5 14.5 1.7 14.5 2V14ZM7 13.5H11V12H7V13.5Z"
        fill="#A1ABB7"
      />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg
      width="11"
      height="16"
      viewBox="0 0 11 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="0.75"
        width="8.5"
        height="14.5"
        rx="1.25"
        stroke="#A1ABB7"
        strokeWidth="1.5"
      />
      <rect x="4.75" y="12" width="2" height="1.5" fill="#A1ABB7" />
    </svg>
  );
}
