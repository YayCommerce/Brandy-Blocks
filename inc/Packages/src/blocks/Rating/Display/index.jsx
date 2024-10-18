import { useContext, useEffect, useState } from "@wordpress/element";
import { RatingContext } from "../edit";
import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { getStarFillPercentage } from "../../../utils/helpers"

export default function Display() {
    const { attributes, setAttributes } = useContext(RatingContext);
    const { starNumbers, rate, starSize, markColor, unmarkColor, spacing, useProductRating, selectedProductId, } = attributes;

    useEffect(() => {
        if (useProductRating) {
            if (!selectedProductId) {
                setAttributes({ rate: 0 });
            } else {
                // Fetch the product rating using the selectedProductId
                apiFetch({ path: `/wc/v3/products/${selectedProductId}` })
                    .then((product) => {
                        const productAverageRating = product.average_rating ? parseFloat(product.average_rating) : rate;
                        setAttributes({ rate: productAverageRating });
                    })
                    .catch(() => {
                        setAttributes({ rate: 0 });
                    });
            }
        }
    }, [useProductRating, selectedProductId, rate]);

    return (
        <div className="brandy-star-wrapper" style={{ display: 'flex', justifyContent: attributes.alignment, gap: `${spacing}px` }}>
            {Array.from({ length: starNumbers }, (_, index) => {
                const fillPercentage = getStarFillPercentage(index, rate);
                return (
                    <div key={index} style={{ width: `${starSize}px`, height: `${starSize}px`, position: 'relative' }}>
                        <svg viewBox="0 0 24 24" width={starSize} height={starSize} style={{ position: 'absolute' }}>
                            <polygon points="12 17.27 18.18 21 15.64 13.97 21 9.24 13.81 8.63 12 2 10.19 8.63 3 9.24 8.36 13.97 5.82 21 12 17.27" fill={unmarkColor} />
                        </svg>
                        <svg viewBox="0 0 24 24" width={starSize} height={starSize} style={{ position: 'absolute', clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}>
                            <polygon points="12 17.27 18.18 21 15.64 13.97 21 9.24 13.81 8.63 12 2 10.19 8.63 3 9.24 8.36 13.97 5.82 21 12 17.27" fill={markColor} />
                        </svg>
                    </div>
                );
            })}
        </div>
    );
}
