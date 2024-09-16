import {
  store as blockEditorStore,
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import AllInspectorSettings from './InspectorControls';
import { v4 as uuid } from 'uuid';

export default function Edit(props) {
  return (
    <>
      <Content {...props} />
    </>
  );
}

const DEFAULT_TEMPLATE = [
  ['brandy/single-testimo-avatar'],
  ['brandy/single-testimo-name'],
  ['brandy/single-testimo-description'],
  ['brandy/single-testimo-content'],
];

function getInsideBlock(blockName, blocks) {
  let findBlock = null;
  blocks.forEach((block) => {
    if (findBlock) {
      return;
    }
    if (block.name === blockName) {
      findBlock = block;
    }

    if (block.innerBlocks && block.innerBlocks.length > 0) {
      const check = getInsideBlock(blockName, block.innerBlocks);
      if (check) {
        findBlock = check;
      }
    }
  });
  return findBlock;
}

export function Content(props) {
  const { isSave = false, context, isSelected, clientId } = props;

  const dataProps = {};

  const blockProps = isSave
    ? useBlockProps.save(dataProps)
    : useBlockProps(dataProps);

  const { replaceInnerBlocks } = useDispatch(blockEditorStore);

  useEffect(() => {
    const replaceFunction = (ev) => {
      if (clientId == ev.detail.clientId) {
        return;
      }

      if (context.rootId == ev.detail.rootId) {
        const currentBlocks = window.wp.data
          .select('core/block-editor')
          .getBlocks(clientId);

        const currentNameBlock = getInsideBlock(
          'brandy/single-testimo-name',
          currentBlocks
        );
        const currentDescriptionBlock = getInsideBlock(
          'brandy/single-testimo-description',
          currentBlocks
        );
        const currentContentBlock = getInsideBlock(
          'brandy/single-testimo-content',
          currentBlocks
        );
        const currentAvatarBlock = getInsideBlock(
          'brandy/single-testimo-avatar',
          currentBlocks
        );

        function loopChildren(children) {
          children.forEach((child) => {
            return child;
          });
          return children.map((child) => {
            if (
              child.name === 'brandy/single-testimo-name' &&
              currentNameBlock
            ) {
              child.attributes.name = currentNameBlock.attributes.name;
            }

            if (
              child.name === 'brandy/single-testimo-description' &&
              currentDescriptionBlock
            ) {
              child.attributes.description =
                currentNameBlock.attributes.description;
            }

            if (
              child.name === 'brandy/single-testimo-content' &&
              currentContentBlock
            ) {
              child.attributes.content = currentNameBlock.attributes.content;
            }

            if (
              child.name === 'brandy/single-testimo-avatar' &&
              currentAvatarBlock
            ) {
              child.attributes.url = currentNameBlock.attributes.url;
            }

            child.clientId = uuid();
            if (child.innerBlocks && child.innerBlocks.length > 0) {
              child.innerBlocks = loopChildren(child.innerBlocks);
            }
            return child;
          });
        }

        const inputLayout = JSON.parse(JSON.stringify(ev.detail.layout));

        const newLayout = loopChildren(inputLayout);
        replaceInnerBlocks(clientId, newLayout);
      }
    };
    window.addEventListener('brandySyncTestimonialsLayout', replaceFunction);
    return () => {
      window.removeEventListener(
        'brandySyncTestimonialsLayout',
        replaceFunction
      );
    };
  }, [clientId, replaceInnerBlocks, context.rootId]);

  const innerBlockProps = isSave
    ? useInnerBlocksProps.save(blockProps)
    : useInnerBlocksProps(blockProps, {
        template: DEFAULT_TEMPLATE,
      });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <AllInspectorSettings {...props} />
      </InspectorControls>
      <div {...innerBlockProps} />
    </div>
  );
}
