import { useSetting } from "@wordpress/block-editor";
import { Popover } from "@wordpress/components";
import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Label from "../Label";
import Select from "../Select";

import Slider from "../Slider";
import "./index.scss";
import ButtonGroup from "../ButtonGroup";

const textStyles = [
  {
    key: "bold",
    label: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.74 8.34C13.5133 8.91333 14.4 10.14 14.4 12.02C14.4 13.2733 13.9933 14.2533 13.18 14.96C12.3667 15.6533 11.2533 16 9.84 16H4V2H9.28C11.9467 2 13.28 3.12667 13.28 5.38C13.28 6.76667 12.7667 7.75333 11.74 8.34ZM6.56 7.5H8.9C9.52667 7.5 9.99333 7.37333 10.3 7.12C10.6067 6.85333 10.76 6.44667 10.76 5.9C10.76 5.32667 10.6067 4.91333 10.3 4.66C9.99333 4.40667 9.52667 4.28 8.9 4.28H6.56V7.5ZM9.46 13.72C10.2067 13.72 10.7733 13.5733 11.16 13.28C11.56 12.9733 11.76 12.46 11.76 11.74C11.76 11.0333 11.5533 10.5333 11.14 10.24C10.74 9.93333 10.18 9.78 9.46 9.78H6.56V13.72H9.46Z"
          fill="#5A6D80"
        />
      </svg>
    ),
  },
  {
    key: "italic",
    label: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 2L8.6 16H7L9.4 2H11Z" fill="#5A6D80" />
      </svg>
    ),
  },
];

const transforms = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "uppercase",
    label: "AA",
  },
  {
    value: "capitalize",
    label: "Aa",
  },
];

const weights = [
  {
    value: 100,
    label: "100",
  },
  {
    value: 200,
    label: "200",
  },
  {
    value: 300,
    label: "300",
  },
  {
    value: 400,
    label: "400",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 600,
    label: "600",
  },
  {
    value: 700,
    label: "700",
  },
];

export default function Typography({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const toggleVisible = (e) => {
    if (!open) {
      setOpen(true);
    } else {
      if (
        buttonRef.current?.contains(e.target) &&
        !popoverRef.current?.parentNode?.contains(e.target)
      ) {
        setOpen(false);
      }
    }
  };

  const handleChange = (key) => (v) => {
    onChange({
      ...value,
      [key]: v,
    });
  };

  const handleChangeSelection = (key) => {
    if (!["underline", "line_through"].includes(key)) {
      onChange({
        ...value,
        [key]: !value[key],
      });
      return;
    }
    if (key === "underline") {
      onChange({
        ...value,
        decoration: value.decoration === "underline" ? "auto" : "underline",
      });
      return;
    }
    if (key === "line_through") {
      onChange({
        ...value,
        decoration:
          value.decoration === "line-through" ? "auto" : "line-through",
      });
      return;
    }
    onChange({
      ...value,
      decoration: "auto",
    });
  };

  useEffect(() => {
    function clickOutside(e) {
      if (
        !buttonRef.current?.contains(e.target) &&
        !popoverRef.current?.parentNode?.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [buttonRef.current, popoverRef.current, setOpen]);

  return (
    <>
      <div
        className="typography-indicator"
        onClick={toggleVisible}
        ref={buttonRef}
      >
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0002 2.62506L9.42878 0L2.14307 7.43766L4.7145 10.0627L12.0002 2.62506ZM4.71226 10.0622L2.14083 7.4371L1.28369 10.9372L4.71226 10.0622ZM5.99854 12.6869H-0.00146484V13.9995H5.99854V12.6869Z"
            fill="#C6D4E1"
          />
        </svg>
        {open && (
          <Popover ref={popoverRef}>
            <div className="brandy-typography-modal">
              <div
                className="brandy-typography-group"
                style={{ marginTop: 10 }}
              >
                <Label title={__("Types", "brandy")} />
                <div className="brandy-typography__selector">
                  <div className="brandy-typography__selection-list">
                    {textStyles.map((o) => {
                      let isActive = value[o.key];
                      if (o.key === "underline") {
                        isActive = value.decoration === "underline";
                      }
                      if (o.key === "line_through") {
                        isActive = value.decoration === "line-through";
                      }
                      return (
                        <span
                          className={`brandy-typography__selection-item ${
                            isActive ? "item-active" : ""
                          }`}
                          onClick={() => {
                            handleChangeSelection(o.key);
                          }}
                        >
                          {o.label}
                        </span>
                      );
                    })}
                  </div>
                  <div className="brandy-typography__selection-list">
                    <Select
                      options={Array.from(
                        { length: 50 },
                        (value, index) => index + 11
                      ).map((o) => ({
                        label: o + "px",
                        value: o,
                      }))}
                      selected={value.font_size}
                      onChange={handleChange("font_size")}
                    />
                  </div>
                  <Select
                    options={transforms}
                    selected={value.text_transform}
                    onChange={handleChange("text_transform")}
                  />
                </div>
              </div>
              <div className="brandy-typography-group brandy-typography__font-weight">
                <Label
                  title={__("Weight", "brandy")}
                  style={{ display: "block" }}
                />
                <Select
                  options={weights}
                  selected={value.font_weight}
                  onChange={handleChange("font_weight")}
                />
              </div>
            </div>
          </Popover>
        )}
      </div>
    </>
  );
}
