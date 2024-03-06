import Slider from "../../../components/Slider";
import ViewportSwitcher from "../../../components/ViewportSwitcher";
import useViewport from "../../../hooks/useViewport";
import { AllProductsContext } from "../edit";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function LayoutSettings() {
  const { attributes, setAttributes } = useContext(AllProductsContext);
  const { viewport } = useViewport();
  const handleChangeColumn = (value) => {
    setAttributes({
      layout_settings: {
        ...attributes.layout_settings,
        columns: {
          ...attributes.layout_settings.columns,
          [viewport.toLowerCase()]: value,
        },
      },
    });
  };
  const handleChangeNumberProducts = (value) => {
    setAttributes({
      layout_settings: {
        ...attributes.layout_settings,
        number_products: value,
      },
    });
  };

  return (
    <>
      <div>
        <span>{__("Columns", "brandy")}</span>
        <ViewportSwitcher />
      </div>
      <Slider
        value={attributes.layout_settings.columns[viewport.toLowerCase()]}
        onChange={handleChangeColumn}
        min={1}
        max={5}
      />
      {(attributes.content_settings.pagination ?? true) && (
        <>
          <div>{__("Products per page", "brandy")}</div>
          <Slider
            value={attributes.layout_settings.number_products}
            onChange={handleChangeNumberProducts}
            min={3}
            max={30}
          />
        </>
      )}
    </>
  );
}
