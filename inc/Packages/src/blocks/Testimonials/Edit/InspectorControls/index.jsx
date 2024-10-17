import {
  InspectorControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import metadata from "../../block.json";
import { changeTestimonialsNumber } from "../../../TestimonialCard/utils";
import NavigationControls from "./NavigationControls";
import PaginationControls from "./PaginationControls";
import ColorsControls from "./ColorsControls";
import CarouselSettings from "./CarouselSettings";

export default function AllInspectorSettings(props) {
  const { attributes, setAttributes, clientId } = props;
  const { replaceInnerBlocks } = useDispatch(blockEditorStore);
  const handleChangeCount = (value) => {
    setAttributes({
      testimonialsCount: value,
    });
    changeTestimonialsNumber({
      rootId: clientId,
      number: value,
      replaceInnerBlocks,
    });
  };
  const handleChangeSlidesPerView = (value) => {
    setAttributes({
      slidesPerView: value,
    });
  };
  const handleChangeCardsSpacing = (value) => {
    setAttributes({
      itemsSpacing: value,
    });
  };

  useEffect(() => {
    const iframe =
      window.jQuery(".edit-site-visual-editor__editor-canvas").length > 0
        ? window.jQuery(".edit-site-visual-editor__editor-canvas")[0]
        : null;
    const targetWindow = iframe ? iframe.contentWindow : window;
    targetWindow.dispatchEvent(
      new CustomEvent("brandyRefreshTestimonials", {
        detail: {
          block: clientId,
        },
      })
    );
  }, [
    attributes.slidesPerView,
    attributes.testimonialsCount,
    attributes.pagination,
    attributes.itemsSpacing,
    attributes.scrollbar,
  ]);
  return (
    <InspectorControls>
      <PanelBody title={__("Settings", "brandy-blocks")}>
        <RangeControl
          __nextHasNoMarginBottom
          label="Testimonials count"
          value={
            attributes.testimonialsCount ??
            metadata.attributes.testimonialsCount.default
          }
          onChange={handleChangeCount}
          min={1}
          max={20}
        />
        <RangeControl
          __nextHasNoMarginBottom
          label="Slides per page"
          value={
            attributes.slidesPerView ??
            metadata.attributes.slidesPerView.default
          }
          onChange={handleChangeSlidesPerView}
          min={1}
          max={6}
        />
        <UnitControl
          label={__("Cards spacing")}
          onChange={handleChangeCardsSpacing}
          value={attributes.itemsSpacing ?? "30px"}
        />
        <ToggleControl
          __nextHasNoMarginBottom
          label="Has scrollbar?"
          checked={attributes.scrollbar?.enabled ?? true}
          onChange={(v) => {
            setAttributes({
              scrollbar: {
                ...(attributes.scrollbar ?? {}),
                enabled: v,
              },
            });
          }}
        />
        {!attributes.scrollbar?.enabled && (
          <>
            <NavigationControls {...props} />
            <PaginationControls {...props} />
          </>
        )}
      </PanelBody>
      <ColorsControls {...props} />
      <CarouselSettings {...props} />
    </InspectorControls>
  );
}
