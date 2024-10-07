import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import AllInspectorSettings from './InspectorControls';

import './style.scss';
import BlockControls from './BlockControls';

export default function Edit(props) {
  return (
    <>
      <InspectorControls>
        <AllInspectorSettings {...props} />
      </InspectorControls>
      <BlockControls {...props} />
      <Content {...props} />
    </>
  );
}

export function Content(props) {
  const { isSave = false, attributes, clientId } = props;

  const { ratingPoint, align } = attributes;

  const dataProps = {
    ...getDataAttributes(attributes),
    ...(isSave
      ? {}
      : {
          onClick: function (e) {
            if (
              window
                .jQuery(e.target)
                .closest('.wp-block-brandy-testimonial-rating').length < 1
            ) {
              return;
            }
            window.wp.data.dispatch('core/block-editor').selectBlock(clientId);
          },
        }),
  };

  const blockProps = isSave
    ? useBlockProps.save(dataProps)
    : useBlockProps(dataProps);

  return (
    <div {...blockProps}>
      {Array(5)
        .fill(true)
        .map((_, index) => (
          <span
            key={index}
            className={`wp-block-brandy-testimonial-rating__star ${
              ratingPoint > index ? 'active-star' : ''
            }`}
            dangerouslySetInnerHTML={{
              __html: `<svg width="26" height="24" viewBox="0 0 26 24" fill="" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.4772 0.978145C11.9116 -0.326048 13.8027 -0.326048 14.237 0.978145L16.2775 7.10518C16.4718 7.68843 17.0289 8.08332 17.6574 8.08332H24.2606C25.6661 8.08332 26.2505 9.8381 25.1134 10.6441L19.7714 14.4309C19.2628 14.7913 19.05 15.4303 19.2443 16.0135L21.2848 22.1406C21.7191 23.4448 20.1891 24.5293 19.052 23.7232L13.71 19.9365C13.2014 19.576 12.5128 19.576 12.0043 19.9365L6.66226 23.7232C5.52515 24.5293 3.99519 23.4448 4.42952 22.1406L6.47001 16.0135C6.66425 15.4303 6.45146 14.7913 5.94293 14.4309L0.600871 10.6441C-0.536233 9.8381 0.0481602 8.08332 1.4537 8.08332H8.05685C8.68542 8.08332 9.24251 7.68843 9.43675 7.10518L11.4772 0.978145Z"/>
          </svg>
          `,
            }}
          ></span>
        ))}
    </div>
  );
}

function getDataAttributes(attributes) {
  return {
    style: {
      ['--rating-default-color']: attributes.defaultColor,
      ['--rating-active-color']: attributes.activeColor,
      ['--rating-size']: attributes.size,
      ['--rating-spacing']: attributes.spacing,
      ['--rating-alignment']: attributes.align,
    },
  };
}
