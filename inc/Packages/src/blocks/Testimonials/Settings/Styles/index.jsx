import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import CollapseMenu from "../../../../components/CollapseMenu";
import Arrow from "./ArrowAndDot/Arrow";
import Dots from "./ArrowAndDot/Dots";
import Star from "./ItemBlock/Star";

import { ReactSortable } from "react-sortablejs";
import { TestimonialsContext } from "../../edit";
import Avatar from "./ItemBlock/Avatar";
import Content from "./ItemBlock/Content";
import Name from "./ItemBlock/Name";
import Subname from "./ItemBlock/Subname";

const layoutDefinition = {
  avatar: Avatar,
  name: Name,
  subname: Subname,
  content: Content,
  rating: Star,
};

export default function Styles() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const layout = attributes.layout ?? [
    "avatar",
    "name",
    "subname",
    "content",
    "rating",
  ];
  const setLayout = (newList) => {
    setAttributes({
      layout: newList.map((i) => i.toString()),
    });
  };
  return (
    <div className="testimonial-settings__styles">
      <CollapseMenu title={__("Item block", "brandy")}>
        <ReactSortable
          list={layout}
          setList={setLayout}
          animation={150}
          easing="ease-in-out"
          className="testimonials-layout-list"
          handle=".item-block-drag-handler"
        >
          {layout.map((k) => {
            const Comp = layoutDefinition[k];
            if (Comp) {
              return <Comp />;
            }
            return null;
          })}
        </ReactSortable>
      </CollapseMenu>
      <CollapseMenu title={__("Arrow & dot", "brandy")}>
        <Dots />
        <Arrow />
      </CollapseMenu>
    </div>
  );
}
