import { useSelect } from "@wordpress/data";
import { useContext, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from "react-sortablejs";
import Label from "../../../../components/Label";
import { TestimonialsContext } from "../../edit";

export default function Sort() {
  const { clientId, setTemplate, setAttributes, template } =
    useContext(TestimonialsContext);
  let innerBlocks = useSelect(
    (select) => {
      const { getBlocks } = select("core/block-editor");
      return getBlocks(clientId);
    },
    [clientId]
  );

  useEffect(() => {
    setTimeout(() => {
      const newTemplate = [...template];
      if (newTemplate.slice(-1)[0] != null) {
        while (newTemplate.slice(-1)[0].length == 0) {
          newTemplate.pop();
        }
        setTemplate(newTemplate);
      }
    }, 1);
  }, [template.length]);

  const setList = (newList) => {
    innerBlocks.forEach((_, ind) => {
      innerBlocks[ind] = newList[ind];
    });

    setTemplate(() => {
      return [...template, []];
    });
  };

  return (
    <div className="setting-wrapper testimonial-sort">
      <Label
        title={__("List testimonials", "brandy")}
        style={{ marginBottom: 0 }}
      />
      <ReactSortable
        list={innerBlocks}
        setList={setList}
        animation={150}
        easing="ease-in-out"
        className="testimonial-sort__list"
      >
        {innerBlocks.map((b) => (
          <div key={b.clientId} className="testimonial-sort__item">
            <img src={b.attributes.image} alt="item-avatar" />
            <span>{b.attributes.name}</span>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}
