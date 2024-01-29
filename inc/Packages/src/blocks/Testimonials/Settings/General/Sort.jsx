import { BaseControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useMemo, useContext } from "@wordpress/element";
import { ReactSortable } from "react-sortablejs";
import { TestimonialsContext } from "../../edit";
import { __ } from "@wordpress/i18n";
import Label from "../../../../components/Label";

export default function Sort() {
  const { clientId, setTemplate, setAttributes } =
    useContext(TestimonialsContext);
  const innerBlocks = useSelect(
    (select) => {
      const { getBlocks } = select("core/block-editor");
      return getBlocks(clientId);
    },
    [clientId]
  );

  const listTestimonials = useMemo(() => {
    const columnsBlock = innerBlocks.find(
      (t) => t.attributes?.className == "brandy-carousel"
    );
    if (columnsBlock == null) {
      return [];
    }
    return columnsBlock.innerBlocks[0].innerBlocks.map((b) => ({
      id: b.clientId,
      name:
        (b.innerBlocks ?? []).find(
          (s) => s.attributes.className === "testmainname"
        )?.attributes?.content ?? "",
      avatar:
        (b.innerBlocks ?? []).find(
          (s) => s.attributes.className === "testimonial__avatar"
        )?.attributes?.url ?? "#",
    }));
  }, [innerBlocks]);

  const setList = (v) => {
    if (innerBlocks[2] == null) {
      return;
    }
    const newList = v.map((t) =>
      innerBlocks[2].innerBlocks[0].innerBlocks.find((b) => b.clientId === t.id)
    );
    innerBlocks[2].innerBlocks[0].innerBlocks = newList;
    setTemplate((t) => {
      return [...t, []];
    });
    setAttributes({ change_detecter: new Date().getTime() });
  };

  return (
    <div className="setting-wrapper testimonial-sort">
      <Label
        title={__("List testimonials", "brandy")}
        style={{ marginBottom: 0 }}
      />
      <ReactSortable
        list={listTestimonials}
        setList={setList}
        animation={150}
        easing="ease-in-out"
        className="testimonial-sort__list"
      >
        {listTestimonials.map((t) => (
          <div key={t.id} className="testimonial-sort__item">
            <img src={t.avatar} alt="item-avatar" />
            <span>{t.name}</span>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}
