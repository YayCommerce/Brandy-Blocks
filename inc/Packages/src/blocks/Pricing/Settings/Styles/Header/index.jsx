import { useContext } from "@wordpress/element";
import { ReactSortable } from "react-sortablejs";
import { PricingContext } from "../../../edit";
import Title from "./Title";
import Description from "./Description";
import Subtitle from "./Subtitle";

const layoutDefinition = {
  title: Title,
  description: Description,
  subtitle: Subtitle,
};

export default function Header() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const layout = attributes.layout;

  const setLayout = (newList) => {
    setAttributes({
      layout: newList.map((i) => i.toString()),
    });
    const newEvent = new CustomEvent("newPricingLayoutNotification", {
      detail: {
        layout: newList.map((i) => i.toString()),
      },
    });
    window.dispatchEvent(newEvent);
  };
  return (
    <ReactSortable
      list={layout}
      setList={setLayout}
      animation={150}
      easing="ease-in-out"
      className="pricing-layout-list"
      handle=".item-block-drag-handler"
    >
      {layout.map((k) => {
        const Comp = layoutDefinition[k];
        if (Comp) {
          return <Comp />;
        }
        return false;
      })}
    </ReactSortable>
  );
}
