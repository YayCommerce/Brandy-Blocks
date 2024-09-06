import {
  Button,
  __experimentalDivider as Divider,
  __experimentalInputControl as InputControl,
  PanelBody,
  ToggleControl,
} from "@wordpress/components";

import { ReactSortable } from "react-sortablejs";

import { __ } from "@wordpress/i18n";

export default function Values({ attributes, setAttributes }) {
  const { options = [], allowMultiple } = attributes;

  const addValue = () => {
    setAttributes({
      options: [
        ...options,
        {
          label: "New option",
          value: "new_option",
          default: false,
        },
      ],
    });
  };

  const changeValue = (ind, data) => {
    const affectDefault = !allowMultiple && data.default;
    const newOptions = options.map((o, i) => ({
      ...o,
      default: affectDefault ? false : o.default,
      ...(i === ind ? { ...data } : {}),
    }));

    setAttributes({
      options: newOptions,
    });
  };

  const deleteValue = (ind) => {
    setAttributes({
      options: options.filter((_, i) => i !== ind),
    });
  };

  const setOptions = (v) => {
    setAttributes({
      options: v,
    });
  };

  return (
    <PanelBody title={__("Values")}>
      <ReactSortable
        list={options}
        setList={setOptions}
        animation={150}
        easing="ease-in-out"
        handle=".drag-handle"
      >
        {options.map((option, ind) => (
          <>
            <div
              key={ind}
              style={{
                padding: 10,
                border: "1px solid #e7e8e9",
                boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.08)",
                borderRadius: 5,
                backgroundColor: "rgb(240, 242, 243)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <Button icon="menu (alt2)" className="drag-handle"></Button>
                  <p>{option.label}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    icon="trash"
                    onClick={() => {
                      deleteValue(ind);
                    }}
                  />
                  <ToggleControl
                    __nextHasNoMarginBottom
                    checked={option.default}
                    onChange={(v) => {
                      changeValue(ind, { default: v });
                    }}
                  />
                </div>
              </div>
              <InputControl
                label={__("Label")}
                value={option.label}
                onChange={(v) => {
                  changeValue(ind, { label: v });
                }}
              />
              <InputControl
                label={__("Value")}
                value={option.value}
                onChange={(v) => {
                  changeValue(ind, { value: v });
                }}
              />
            </div>
            <Divider />
          </>
        ))}
      </ReactSortable>
      <Button isSecondary={true} onClick={addValue}>
        {__("Add option")}
      </Button>
    </PanelBody>
  );
}
