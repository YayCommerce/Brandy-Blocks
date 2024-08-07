import {
  BlockControls,
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";
import { useInstanceId } from "@wordpress/compose";

import QueryToolbar from "./BlockControls";
import QueryInspectorControls from "./InspectorControls";

const TEMPLATE = [
  [
    "brandy/post-template",
    {
      layout: {
        type: "grid",
        columnCount: 3,
      },
    },
  ],
];

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  const blockProps = useBlockProps();
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

  const instanceId = useInstanceId(Edit);

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: TEMPLATE,
  });

  const { queryId } = attributes;

  useEffect(() => {
    if (!Number.isFinite(queryId)) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ queryId: instanceId });
    }
  }, [queryId, instanceId]);

  return (
    <>
      <InspectorControls>
        <QueryInspectorControls
          setAttributes={setAttributes}
          attributes={attributes}
          clientId={clientId}
        />
      </InspectorControls>
      <BlockControls>
        <QueryToolbar
          clientId={clientId}
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </BlockControls>
      <div {...innerBlocksProps} />
    </>
  );
}
