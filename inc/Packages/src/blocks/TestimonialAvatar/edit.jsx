import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import BlockControls from './BlockControls';
import './style.scss';

export default function Edit(props) {
  return <Content {...props} />;
}

const DEFAULT_TEMPLATE = [
  [
    'core/image',
    {
      url: 'https://images.wpbrandy.com/uploads/blocks-test-img-1-min.png',
      alt: 'testimonial-avatar',
    },
  ],
];

export function Content(props) {
  const { isSave, clientId } = props;
  const dataProps = {
    ...(isSave
      ? {}
      : {
          onClick: function (e) {
            if (
              window
                .jQuery(e.target)
                .closest('.wp-block-brandy-testimonial-avatar').length < 1
            ) {
              return;
            }
            window.wp.data.dispatch('core/block-editor').selectBlock(clientId);
          },
        }),
  };
  const blockProps = isSave ? useBlockProps.save() : useBlockProps(dataProps);

  return (
    <div {...blockProps}>
      {!isSave && <BlockControls {...props} />}
      {isSave ? (
        <InnerBlocks.Content />
      ) : (
        <InnerBlocks template={DEFAULT_TEMPLATE} templateLock="all" />
      )}
    </div>
  );
}
