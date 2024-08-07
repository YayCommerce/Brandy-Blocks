import {
  BlockContextProvider,
  BlockControls,
  store as blockEditorStore,
  __experimentalUseBlockPreview as useBlockPreview,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { Spinner } from "@wordpress/components";
import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { memo, useMemo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import PostTemplateToolbar from "./BlockControls";
import clsx from "clsx";

const TEMPLATE = [
  [
    "core/post-featured-image",
    {
      isLink: true,
      style: {
        border: {
          radius: "10px",
        },
        spacing: {
          margin: {
            bottom: "1rem",
          },
        },
      },
    },
  ],
  [
    "core/post-date",
    {
      textColor: "brandy-secondary-text",
      fontSize: "small",
      textAlign: "center",
      style: {
        spacing: {
          margin: {
            top: "0",
            bottom: "6px",
            left: "0",
            right: "0",
          },
        },
      },
    },
  ],
  [
    "core/post-title",
    {
      textColor: "brandy-primary-text",
      textAlign: "center",
      level: 4,
      isLink: true,
      className: "brandy-text-ellipsis-2",
      style: {
        elements: {
          link: {
            color: {
              text: "var:preset|color|brandy-primary-text",
            },
          },
        },
        spacing: {
          margin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          },
        },
      },
    },
  ],
];

function PostTemplateInnerBlocks({ classList }) {
  const innerBlocksProps = useInnerBlocksProps(
    { className: clsx("wp-block-post", classList) },
    { template: TEMPLATE, __unstableDisableLayoutClassNames: true }
  );
  return <li {...innerBlocksProps} />;
}

function PostTemplateBlockPreview({
  blocks,
  blockContextId,
  classList,
  isHidden,
  setActiveBlockContextId,
}) {
  const blockPreviewProps = useBlockPreview({
    blocks,
    props: {
      className: clsx("wp-block-post", classList),
    },
  });

  const handleOnClick = () => {
    setActiveBlockContextId(blockContextId);
  };

  const style = {
    display: isHidden ? "none" : undefined,
  };

  return (
    <li
      {...blockPreviewProps}
      tabIndex={0}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      onClick={handleOnClick}
      onKeyPress={handleOnClick}
      style={style}
    />
  );
}

const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

export default function Edit(props) {
  const {
    attributes,
    clientId,
    setAttributes,
    __unstableLayoutClassNames,
    context,
  } = props;
  const { layout } = attributes;

  const blockProps = useBlockProps({
    className: clsx(__unstableLayoutClassNames, {
      [`columns-${layout?.columnCount ?? 3}`]:
        layout?.type !== "default" && layout?.columnCount,
    }),
  });

  const [activeBlockContextId, setActiveBlockContextId] = useState();

  const { posts, blocks } = useSelect(
    (select) => {
      const { getEntityRecords } = select(coreStore);
      const { getBlocks } = select(blockEditorStore);

      const query = {
        offset: context?.query?.offset || 0,
        order: context?.query?.order || "asc",
        orderby: context?.query?.orderBy || "title",
      };

      if (context?.query?.perPage) {
        query.per_page = context?.query?.perPage;
      }

      if (context?.query?.categoryIds) {
        query.categories = context?.query?.categoryIds;
      }
      if (context?.query?.tagIds) {
        query.tags = context?.query?.tagIds;
      }
      if (context?.query?.exclude) {
        query.exclude = context?.query?.exclude;
      }

      return {
        posts: getEntityRecords("postType", "post", {
          ...query,
        }),
        blocks: getBlocks(clientId),
      };
    },
    [context.query]
  );

  const blockContexts = useMemo(
    () =>
      posts?.map((post) => ({
        postType: post.type,
        postId: post.id,
        classList: post.class_list ?? "",
      })),
    [posts]
  );

  if (!posts) {
    return (
      <p {...blockProps}>
        <Spinner />
      </p>
    );
  }

  if (!posts.length) {
    return <p {...blockProps}> {__("No results found.")}</p>;
  }

  return (
    <>
      <BlockControls>
        <PostTemplateToolbar
          attributes={attributes}
          setAttributes={setAttributes}
          clientId={clientId}
        />
      </BlockControls>
      <ul {...blockProps}>
        {blockContexts &&
          blockContexts.map((blockContext) => (
            <BlockContextProvider
              key={blockContext.postId}
              value={blockContext}
            >
              {blockContext.postId ===
              (activeBlockContextId || blockContexts[0]?.postId) ? (
                <PostTemplateInnerBlocks classList={blockContext.classList} />
              ) : null}
              <MemoizedPostTemplateBlockPreview
                blocks={blocks}
                blockContextId={blockContext.postId}
                classList={blockContext.classList}
                setActiveBlockContextId={setActiveBlockContextId}
                isHidden={
                  blockContext.postId ===
                  (activeBlockContextId || blockContexts[0]?.postId)
                }
              />
            </BlockContextProvider>
          ))}
      </ul>
    </>
  );
}
