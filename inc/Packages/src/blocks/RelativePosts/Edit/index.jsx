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

  const { queryId, query } = attributes;

  useEffect(() => {
    if (!Number.isFinite(queryId)) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ queryId: instanceId });
    }
  }, [queryId, instanceId]);

  useEffect(() => {
    const relatedBy = query.relatedBy ?? "category";
    const newQuery = {};
    if (relatedBy === "tag") {
      const tagIds = window.wp.data
        .select("core/editor")
        .getEditedPostAttribute("tags");
      newQuery.tagIds = tagIds;
      newQuery.categoryIds = [];
    }

    if (relatedBy === "category") {
      const categoryIds = window.wp.data
        .select("core/editor")
        .getEditedPostAttribute("categories");
      newQuery.tagIds = [];
      newQuery.categoryIds = categoryIds;
    }

    const currentPostId = window.wp.data
      .select("core/editor")
      .getCurrentPostId();

    newQuery.exclude = [currentPostId];

    setAttributes({
      query: {
        ...query,
        ...newQuery,
      },
    });
  }, [query.relatedBy]);

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
