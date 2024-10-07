import {
  BlockContextProvider,
  store as blockEditorStore,
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useDispatch } from '@wordpress/data';
import { useEffect, useMemo } from '@wordpress/element';
import { syncWithOtherBlocks } from '../utils';
import BlockControls from './BlockControls';

export default function Edit(props) {
  const { context, clientId } = props;
  const { replaceInnerBlocks } = useDispatch(blockEditorStore);

  useEffect(() => {
    function replaceFunction(ev) {
      syncWithOtherBlocks({
        singleId: clientId,
        ev,
        rootId: context.rootId,
        replaceInnerBlocks,
      });
    }
    window.addEventListener('brandySyncTestimonialsLayout', replaceFunction);
    return () => {
      window.removeEventListener(
        'brandySyncTestimonialsLayout',
        replaceFunction
      );
    };
  }, [clientId, replaceInnerBlocks, context.rootId]);

  const blockContextValue = useMemo(
    () => ({
      singleTestimonialId: clientId,
      rootId: context.rootId,
    }),
    [clientId, context.rootId]
  );

  return (
    <>
      <BlockControls {...props} />
      <BlockContextProvider value={blockContextValue}>
        <Content {...props} />
      </BlockContextProvider>
    </>
  );
}

export function getDefaultCardTemplate({
  name = 'Anthony Nguyen',
  description = 'Via google.com',
  content = 'Making a type specimen book, also the leap into electronic typesetting remain essentially unchanged or avoids pleasure itself the master builder of is human happiness.',
  ratingPoint = 5,
  avatarUrl = 'https://images.wpbrandy.com/uploads/blocks-test-img-1-min.png',
}) {
  return [
    [
      'core/group',
      {},
      [
        [
          'core/group',
          {
            layout: {
              type: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'left',
            },
            style: {
              spacing: {
                margin: {
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                },
                padding: {
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                },
                blockGap: '20px',
              },
            },
          },
          [
            [
              'brandy/testimonial-avatar',
              {},
              [
                [
                  'core/image',
                  {
                    width: '70px',
                    height: '70px',
                    scale: 'cover',
                    style: {
                      border: {
                        radius: '100%',
                      },
                    },
                    url: avatarUrl,
                  },
                ],
              ],
            ],
            [
              'core/group',
              {
                style: {
                  spacing: {
                    blockGap: '3px',
                  },
                },
              },
              [
                [
                  'brandy/testimonial-name',
                  {
                    name,
                    style: {
                      typography: {
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: '600',
                      },
                      color: {
                        text: '#122940',
                      },
                      elements: {
                        link: {
                          color: {
                            text: '#122940',
                          },
                        },
                      },
                    },
                  },
                ],
                [
                  'brandy/testimonial-description',
                  {
                    description,
                    style: {
                      typography: {
                        fontSize: '14px',
                      },
                      color: {
                        text: '#7f8287',
                      },
                      elements: {
                        link: {
                          color: {
                            text: '#7f8287',
                          },
                        },
                      },
                    },
                  },
                ],
              ],
            ],
          ],
        ],
        [
          'brandy/testimonial-content',
          {
            content,
            style: {
              typography: {
                fontSize: '24px',
                fontStyle: 'italic',
                fontWeight: '400',
              },
            },
          },
        ],
        [
          'brandy/testimonial-rating',
          {
            ratingPoint,
            size: '25px',
            activeColor: '#ffac70',
          },
        ],
      ],
    ],
  ];
}

export const DEFAULT_TESTIMONIAL_CARD_TEMPLATE = getDefaultCardTemplate({});

export function Content(props) {
  const { isSave = false, clientId } = props;

  const dataProps = {
    className: 'swiper-slide',
    ...(isSave
      ? {}
      : {
          onClick: function (e) {
            if (
              !e.target.classList.contains('wp-block-brandy-testimonial-card')
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

  const ALLOWED_BLOCKS = wp.blocks
    .getBlockTypes()
    .map((block) => block.name)
    .filter((blockName) => blockName !== 'brandy/testimonials');

  const innerBlockProps = isSave
    ? useInnerBlocksProps.save()
    : useInnerBlocksProps(
        {},
        {
          template: DEFAULT_TESTIMONIAL_CARD_TEMPLATE,
          allowedBlocks: ALLOWED_BLOCKS,
        }
      );
  return (
    <>
      <div {...blockProps}>
        <div {...innerBlockProps} />
      </div>
    </>
  );
}
