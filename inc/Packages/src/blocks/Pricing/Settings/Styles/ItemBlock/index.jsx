import { useContext } from "@wordpress/element";
import { ReactSortable } from "react-sortablejs";
import Button from "./Button";
import Description from "./Description";
import Highlight from "./Highlight";
import Pricing from "./Pricing";
import Title from "./Title";
import ListFeatures from "./ListFeatures";
import { PricingContext } from "../../../edit";

const layoutDefinition = {
  highlight: Highlight,
  title: Title,
  pricing: Pricing,
  description: Description,
  list_features: ListFeatures,
  button: Button,
};

export default function ItemBlock() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const layout = attributes.card_layout ?? [];

  const setLayout = (v) => {
    setAttributes({
      card_layout: v.map((i) => i.toString()),
    });
    const newEvent = new CustomEvent("newLayoutNotification", {
      detail: {
        card_layout: v.map((i) => i.toString()),
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
      className="pricing-card-layout-list"
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
