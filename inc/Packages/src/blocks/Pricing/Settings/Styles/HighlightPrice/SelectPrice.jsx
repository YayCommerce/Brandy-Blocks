import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import Label from "../../../../../components/Label";
import Select from "../../../../../components/Select";

export default function SelectPrice() {
  const { attributes, setAttributes } = useContext(PricingContext);

  const handleChangeSelected = (v) => {
    setAttributes({
      highlight_price: {
        ...attributes.highlight_price,
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
          { label: __("Card 1", "brandy"), value: 1 },
          { label: __("Card 2", "brandy"), value: 2 },
          { label: __("Card 3", "brandy"), value: 3 },
        ]}
        selected={attributes.highlight_price.selected}
        onChange={handleChangeSelected}
      />
    </div>
  );
}
