import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  BlockContextProvider,
  store as blockEditorStore,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  return (
    <>
      <Content {...props} />
    </>
  );
}

const DEFAULT_TEMPLATE = [
  ['brandy/single-testimo'],
  ['brandy/single-testimo'],
  ['brandy/single-testimo'],
];

export function Content(props) {
  const { isSave = false, clientId } = props;

  const dataProps = {};

  const blockProps = isSave
    ? useBlockProps.save(dataProps)
    : useBlockProps(dataProps);

  const innerBlockProps = isSave
    ? useInnerBlocksProps.save(blockProps)
    : useInnerBlocksProps(blockProps, {
        template: DEFAULT_TEMPLATE,
      });

  const blockContextValue = useSelect((select) => {
    const { getBlocks } = select(blockEditorStore);

    return {
      rootBlocks: getBlocks(clientId),
      rootId: clientId,
    };
  });

  return (
    <div {...blockProps}>
      Test
      <BlockContextProvider value={blockContextValue}>
        <div {...innerBlockProps} />
      </BlockContextProvider>
    </div>
  );
}
