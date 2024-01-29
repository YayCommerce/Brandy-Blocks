import { ColorPalette, Button, Popover } from "@wordpress/components";
import { useSetting } from "@wordpress/block-editor";
import { useState, useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import "./index.scss";

export default function ColorPicker({ color, onChange }) {
  const themeColors = useSetting("color.palette.theme");
  const defaultColors = useSetting("color.palette.default");
  const [open, setOpen] = useState(false);
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
  const colors = [
    {
      name: __("Theme", "brandy"),
      colors: themeColors,
    },
    {
      name: __("Default", "brandy"),
      colors: defaultColors,
    },
  ];

  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

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
    <div className="color-picker">
      <div className="color-picker__head">
        <div
          className="color-indicator"
          style={{ background: color }}
          onClick={toggleVisible}
          ref={buttonRef}
        >
          {open && (
            <Popover className="brandy-color-popover" ref={popoverRef}>
              <div className="brandy-color-modal">
                <ColorPalette
                  colors={colors}
                  value={color}
                  onChange={onChange}
                />
              </div>
            </Popover>
          )}
        </div>
      </div>
      <span className="color-picker__tail">
        {color.replace("#", "").replace("var(--", "").replace(")", "")}
      </span>
    </div>
  );
}
