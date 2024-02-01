import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import Label from "../../../../../components/Label";
import Select from "../../../../../components/Select";

export default function SelectPrice() {
  const { attributes, setAttributes } = useContext(PricingContext);

  const handleChangeSelected = (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        selected: v,
      },
    });
  };
  return (
    <div>
      <Label title={__("Select card", "brandy")} style={{ marginBottom: 10 }} />
      <Select
        options={[
          {
            label: __("None", "brandy"),
            value: 0,
          },
          ...Array.from({ length: attributes.number_card }).map((_, ind) => ({
            label: `Card ${ind + 1}`,
            value: ind + 1,
          })),
        ]}
        selected={attributes.highlight_settings.selected}
        onChange={handleChangeSelected}
      />
    </div>
  );
}
