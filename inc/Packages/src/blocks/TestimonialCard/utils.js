import { v4 as uuid } from 'uuid';

function isNameBlock(blockName) {
  return blockName === 'brandy/testimonial-name';
}
function isDescriptionBlock(blockName) {
  return blockName === 'brandy/testimonial-description';
}
function isContentBlock(blockName) {
  return blockName === 'brandy/testimonial-content';
}
function isAvatarBlock(blockName) {
  return blockName === 'brandy/testimonial-avatar';
}
function isRatingBlock(blockName) {
  return blockName === 'brandy/testimonial-rating';
}

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

export const syncWithOtherBlocks = ({
  rootId,
  singleId,
  ev,
  blockId,
  replaceInnerBlocks,
}) => {
  if (singleId == ev.detail.singleId) {
    return;
  }

  if (rootId == ev.detail.rootId) {
    const currentBlocksInSingle = window.wp.data
      .select('core/block-editor')
      .getBlocks(singleId);
    const syncBlocks = ev.detail.syncBlocks ?? ['all'];
    const changingBlocks = syncBlocks.includes('all')
      ? window.wp.data.select('core/block-editor').getBlocks(ev.detail.singleId)
      : currentBlocksInSingle;

    if (syncBlocks.includes('all')) {
      const changingSingle = window.wp.data
        .select('core/block-editor')
        .getBlock(ev.detail.singleId);

      window.wp.data.dispatch('core/block-editor').updateBlock(singleId, {
        attributes: JSON.parse(JSON.stringify(changingSingle.attributes)),
      });
    }

    let nameBlock, descriptionBlock, contentBlock, avatarBlock, ratingBlock;
    if (syncBlocks.includes('all')) {
      nameBlock = getInsideBlock(
        'brandy/testimonial-name',
        currentBlocksInSingle
      );

      descriptionBlock = getInsideBlock(
        'brandy/testimonial-description',
        currentBlocksInSingle
      );

      contentBlock = getInsideBlock(
        'brandy/testimonial-content',
        currentBlocksInSingle
      );

      avatarBlock = getInsideBlock(
        'brandy/testimonial-avatar',
        currentBlocksInSingle
      );

      ratingBlock = getInsideBlock(
        'brandy/testimonial-rating',
        currentBlocksInSingle
      );
    } else {
      const findBlock = window.wp.data
        .select('core/block-editor')
        .getBlock(ev.detail.blockId);
      if (isNameBlock(findBlock?.name) && syncBlocks.includes('name')) {
        nameBlock = findBlock;
      }

      if (
        isDescriptionBlock(findBlock?.name) &&
        syncBlocks.includes('description')
      ) {
        descriptionBlock = findBlock;
      }

      if (isContentBlock(findBlock?.name) && syncBlocks.includes('content')) {
        contentBlock = findBlock;
      }

      if (isAvatarBlock(findBlock?.name) && syncBlocks.includes('avatar')) {
        avatarBlock = findBlock;
      }

      if (isRatingBlock(findBlock?.name) && syncBlocks.includes('rating')) {
        ratingBlock = findBlock;
      }
    }

    function loopChildren(children) {
      children.forEach((child) => {
        return child;
      });
      return children.map((child) => {
        if (isNameBlock(child?.name) && nameBlock) {
          if (syncBlocks.includes('all')) {
            child.attributes.name = nameBlock.attributes.name;
          } else {
            child.attributes = {
              ...nameBlock.attributes,
              name: child.attributes.name,
            };
          }
        }

        if (isDescriptionBlock(child?.name) && descriptionBlock) {
          if (syncBlocks.includes('all')) {
            child.attributes.description =
              descriptionBlock.attributes.description;
          } else {
            child.attributes = {
              ...descriptionBlock.attributes,
              description: child.attributes.description,
            };
          }
        }

        if (isContentBlock(child?.name) && contentBlock) {
          if (syncBlocks.includes('all')) {
            child.attributes.content = contentBlock.attributes.content;
          } else {
            child.attributes = {
              ...contentBlock.attributes,
              content: child.attributes.content,
            };
          }
        }

        if (isAvatarBlock(child?.name) && avatarBlock) {
          if (syncBlocks.includes('all')) {
            child.innerBlocks[0].attributes.url =
              avatarBlock.innerBlocks[0].attributes.url;
          } else {
            child.innerBlocks[0].attributes = {
              ...avatarBlock.innerBlocks[0].attributes,
              url: child.innerBlocks[0].attributes.url,
            };
          }
        }

        if (isRatingBlock(child?.name) && ratingBlock) {
          if (syncBlocks.includes('all')) {
            child.attributes.ratingPoint = ratingBlock.attributes.ratingPoint;
          } else {
            child.attributes = {
              ...ratingBlock.attributes,
              ratingPoint: child.attributes.ratingPoint,
            };
          }
        }

        if (syncBlocks.includes('all')) {
          child.clientId = uuid();
        }
        if (child.innerBlocks && child.innerBlocks.length > 0) {
          child.innerBlocks = loopChildren(child.innerBlocks);
        }
        return child;
      });
    }

    const inputLayout = JSON.parse(JSON.stringify(changingBlocks));
    const newLayout = loopChildren(inputLayout);
    replaceInnerBlocks(singleId, newLayout);
  }
};

export function changeTestimonialsNumber({
  rootId,
  replaceInnerBlocks,
  number,
}) {
  const innerTestimonialCards = window.wp.data
    .select('core/block-editor')
    .getBlocks(rootId);

  const newInnerCards = JSON.parse(JSON.stringify(innerTestimonialCards));

  if (number < innerTestimonialCards.length) {
    newInnerCards.splice(number, innerTestimonialCards.length);
  }

  if (number > newInnerCards.length) {
    function replaceId(block) {
      block.clientId = uuid();

      if (block.innerBlocks && block.innerBlocks.length > 0) {
        block.innerBlocks = block.innerBlocks.map((b) => replaceId(b));
      }

      return block;
    }

    const duplicateCard = innerTestimonialCards[0];
    while (newInnerCards.length < number) {
      newInnerCards.push(replaceId(JSON.parse(JSON.stringify(duplicateCard))));
    }
  }
  replaceInnerBlocks(rootId, newInnerCards);
}
