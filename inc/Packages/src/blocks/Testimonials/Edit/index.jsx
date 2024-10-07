import {
  BlockContextProvider,
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor';

import AllInspectorSettings from './InspectorControls';

import { getDefaultCardTemplate } from '../../TestimonialCard/Edit';

import cardMetaData from '../../TestimonialCard/block.json';
import metadata from '../block.json';

import '../style.scss';

export default function Edit(props) {
  return (
    <>
      <AllInspectorSettings {...props} />
      <BlockContextProvider
        value={{
          rootId: props.clientId,
        }}
      >
        <Content {...props} />
      </BlockContextProvider>
    </>
  );
}

const DEFAULT_TEMPLATE = [
  [
    'brandy/testimonial-card',
    cardMetaData.attributes,
    getDefaultCardTemplate({
      name: 'Anthony Nguyen',
      ratingPoint: 4,
    }),
  ],
  [
    'brandy/testimonial-card',
    cardMetaData.attributes,
    getDefaultCardTemplate({
      name: 'Thomas James',
      avatarUrl:
        'https://images.wpbrandy.com/uploads/blocks-test-img-2-min.png',
    }),
  ],
  [
    'brandy/testimonial-card',
    cardMetaData.attributes,
    getDefaultCardTemplate({
      name: 'Linda Rosabella',
      ratingPoint: 3,
      avatarUrl:
        'https://images.wpbrandy.com/uploads/blocks-test-img-3-min.png',
    }),
  ],
];

export function Content(props) {
  const { isSave = false, attributes, clientId } = props;

  const parentProps = {
    ...getDataAttributes(attributes),
  };

  const innerProps = {
    className: 'swiper-wrapper',
    ...(isSave
      ? {}
      : {
          onClick: function (e) {
            if (!e.target.classList.contains('swiper-wrapper')) {
              return;
            }
            window.wp.data.dispatch('core/block-editor').selectBlock(clientId);
          },
        }),
  };

  const blockProps = isSave
    ? useBlockProps.save(parentProps)
    : useBlockProps(parentProps);

  const innerBlockProps = isSave
    ? useInnerBlocksProps.save(innerProps)
    : useInnerBlocksProps(innerProps, {
        template: DEFAULT_TEMPLATE,
        renderAppender: false,
      });

  return (
    <div {...blockProps}>
      {attributes.testimonialsCount > attributes.slidesPerView && (
        <div className="wp-block-brandy-testimonials__navigation swiper-button-prev" />
      )}
      <div className="swiper">
        <div {...innerBlockProps} />
      </div>
      {attributes.testimonialsCount > attributes.slidesPerView && (
        <>
          <div className="wp-block-brandy-testimonials__navigation swiper-button-next" />
          {attributes.pagination?.enabled && (
            <div className="wp-block-brandy-testimonials__pagination swiper-pagination" />
          )}
        </>
      )}
    </div>
  );
}

function getDataAttributes(attributes) {
  return {
    ['data-slides-per-view']:
      attributes.slidesPerView ?? metadata.attributes.slidesPerView.default,
    ['data-auto-play']:
      attributes.autoplay ?? metadata.attributes.autoPlay.default,
    ['data-loop']:
      attributes.infiniteLoop ?? metadata.attributes.infiniteLoop.default,
    ['data-slides']:
      attributes.testimonialsCount ??
      metadata.attributes.testimonialsCount.default,
    style: {
      '--brandy-testimonials-navigation-size':
        attributes.navigation?.size ??
        metadata.attributes.navigation.default.size,
      '--brandy-testimonials-navigation-icon-size':
        attributes.navigation?.iconSize ??
        metadata.attributes.navigation.default.iconSize,
      '--brandy-testimonials-navigation-background-color':
        attributes.navigation?.backgroundColor ??
        metadata.attributes.navigation.default.backgroundColor,
      '--brandy-testimonials-navigation-background-color-hover':
        attributes.navigation?.backgroundHoverColor ??
        metadata.attributes.navigation.default.backgroundHoverColor,
      '--brandy-testimonials-navigation-icon-color':
        attributes.navigation?.iconColor ??
        metadata.attributes.navigation.default.iconColor,
      '--brandy-testimonials-navigation-icon-color-hover':
        attributes.navigation?.iconHoverColor ??
        metadata.attributes.navigation.default.iconHoverColor,
      '--brandy-testimonials-pagination-bullet-color':
        attributes.pagination?.defaultColor ??
        metadata.attributes.pagination.default.defaultColor,
      '--brandy-testimonials-pagination-bullet-color-active':
        attributes.pagination?.activeColor ??
        metadata.attributes.pagination.default.activeColor,
      '--brandy-testimonials-pagination-bullet-size':
        attributes.pagination?.size ??
        metadata.attributes.pagination.default.size,
      '--brandy-testimonials-pagination-bullet-spacing':
        attributes.pagination?.spacing ??
        metadata.attributes.pagination.default.spacing,
    },
  };
}
