import { InspectorControls } from "@wordpress/block-editor";

import { useSelect } from "@wordpress/data";
import { useContext, useEffect } from "@wordpress/element";
import BrandyTabs from "../../../components/Tabs";
import { TestimonialsContext } from "../edit";
import General from "./General";
import Styles from "./Styles";
import { GeneralIcon, StylesIcon } from "../../../components/Icons";

const tabItems = [
  {
    name: "tab1",
    className: "tab-one",
    icon: GeneralIcon,
    component: General,
  },
  {
    name: "tab2",
    className: "tab-two",
    icon: StylesIcon,
    component: Styles,
  },
];

export default function Settings() {
  const { attributes } = useContext(TestimonialsContext);

  const isSelectedInSingleTestimonial = useSelect((select) => {
    const selectedBlock = select("core/block-editor").getSelectedBlock();
    const parentBlocks = select("core/block-editor").getBlockParents(
      selectedBlock?.clientId
    );
    const parentAttributes =
      select("core/block-editor").getBlocksByClientId(parentBlocks);
    let check = false;
    if (selectedBlock?.name === "brandy/single-testimonial") {
      check = true;
    }
    parentAttributes.forEach((attrs) => {
      if (attrs.name === "brandy/single-testimonial") {
        check = true;
      }
    });
    return check;
  });

  useEffect(() => {
    if (!isSelectedInSingleTestimonial) {
      if (window.brandy?.carousels) {
        window.brandy.carousels?.openInterval();
        window.brandy.carousels.load();
      }
    } else {
      if (window.brandy?.carousels) {
        window.brandy.carousels?.stopInterval();
      }
    }
  }, [isSelectedInSingleTestimonial]);

  useEffect(() => {
    const event = new CustomEvent("carouselDestroyed", {});
    window.dispatchEvent(event);
    const timeoutId = setTimeout(() => {
      if (window.brandy?.carousels?.load) {
        window.brandy.carousels.load();
      }
    }, 1);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    attributes.number_testimonials,
    attributes.carousel,
    attributes.item_spacing,
    attributes.star,
  ]);

  return (
    <InspectorControls key="setting">
      <div className="brandy-editor testimonials-settings">
        <BrandyTabs items={tabItems} />
      </div>
    </InspectorControls>
  );
}
