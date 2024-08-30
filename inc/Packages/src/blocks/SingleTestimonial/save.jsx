import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { rating } = attributes;

    return (
        <div
            {...blockProps}
            className={`${blockProps.className} brandy-testimonials__card`}
            data-rating={rating}
        > 
            <InnerBlocks.Content />
        </div>
    );
}
