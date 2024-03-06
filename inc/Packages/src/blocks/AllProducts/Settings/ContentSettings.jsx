import { useContext } from "@wordpress/element";
import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { AllProductsContext } from "../edit";
import Select from "../../../components/Select";

const flexLineStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const settingLineStyle = {
  marginBottom: 10,
};

export default function ContentSettings() {
  const { attributes, setAttributes } = useContext(AllProductsContext);

  const handleChangeValue = (key) => (value) => {
    setAttributes({
      content_settings: {
        ...attributes.content_settings,
        [key]: value,
      },
    });
  };

  return (
    <>
      <div style={{ ...flexLineStyle, ...settingLineStyle }}>
        <span>{__("Show sorting", "brandy")}</span>
        <ToggleControl
          checked={attributes.content_settings.show_sorting ?? true}
          onChange={handleChangeValue("show_sorting")}
        />
      </div>
      <div style={{ ...flexLineStyle, ...settingLineStyle }}>
        <span>{__("Pagination", "brandy")}</span>
        <ToggleControl
          checked={attributes.content_settings.pagination ?? true}
          onChange={handleChangeValue("pagination")}
        />
      </div>
      <div style={settingLineStyle}>
        <div>{__("Order by", "brandy")}</div>
        <Select
          selected={attributes.content_settings.order_by ?? "latest"}
          onChange={handleChangeValue("order_by")}
          options={[
            {
              label: __("Popularity", "brandy"),
              value: "popularity",
            },
            {
              label: __("Average rating", "brandy"),
              value: "rating",
            },
            {
              label: __("Latest", "brandy"),
              value: "latest",
            },
            {
              label: __("Price: low to high", "brandy"),
              value: "lowest",
            },
            {
              label: __("Price: high to low", "brandy"),
              value: "highest",
            },
          ]}
        />
      </div>
    </>
  );
}
