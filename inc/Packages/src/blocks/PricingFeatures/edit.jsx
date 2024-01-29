import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useMemo } from "@wordpress/element";

export default function Edit({ context }) {
  const blockProps = useBlockProps();
  const _template = useMemo(() => {
    return context["brandy/pricing-card/features"].map((v, index) => [
      "brandy/pricing-feature",
      {
        status: v.status,
        content: v.text,
        position: index,
      },
    ]);
  }, [context["brandy/pricing-card/features"]]);

  return (
    <div {...blockProps}>
      <div className="brandy-pricing-feature-list">
        <InnerBlocks template={_template} templateLock="all" />
      </div>
    </div>
  );
}
