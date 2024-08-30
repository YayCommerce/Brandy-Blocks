import {
  InnerBlocks,
  useBlockProps,
} from "@wordpress/block-editor";
import { useEffect, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes, context }) {
  const blockProps = useBlockProps();

  const rating = useMemo(() => attributes.rating, [attributes.rating]);

  const template = useMemo(() => {
    return [
      [
        'core/group', 
        { className: 'brand-testimonials__card__header' }, 
        [
          // [
          //   'core/image', 
          //   {
          //     className: "brandy-testimonials__card__avatar",
          //     url: attributes.image,
          //     alt: "testimonial-avatar"
          //   }
          // ],
          [
            'brandy/single-testimonial-avatar',{  image: attributes.image }
          ],
          [
            'core/group', 
            { className: 'brand-testimonials__card__info' }, 
            [
              ['brandy/single-testimonial-name', { name: attributes.name, className: 'brandy-testimonials__card__name' }],
              ['brandy/single-testimonial-subname', { subname: attributes.subname, className: 'brandy-testimonials__card__subname' }]
            ]
          ]
        ]
      ],
      [
        'brandy/single-testimonial-content', { content: attributes.content, className: 'brandy-testimonials__card__content' }
      ],
      ['brandy/single-testimonial-star', { rating: attributes.star, className: 'brandy-testimonials__card__rating' }]
    ];
  }, [attributes]);
 
  useEffect(() => {
    setAttributes({
      context,
    });
  }, [context["brandy/testimonials/layout"]]);

  return (
    <div
      {...blockProps}
      className={`${blockProps.className} brandy-testimonials__card`}
      data-rating={rating}
    >
      <InnerBlocks 
        template={template} 
        templateLock="all"
      />
    </div>
  );
}
