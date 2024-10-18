import { useContext, useState, useEffect, useRef } from "@wordpress/element";
import { RatingContext } from "../edit";
import { ToggleControl, TextControl, Spinner } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';

export default function ProductRatingSettings() {
    const { attributes, setAttributes } = useContext(RatingContext);
    const { useProductRating, selectedProductId } = attributes;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const resultsRef = useRef(null);

    // Fetch the selected product's name on page load if an ID is present
    useEffect(() => {
        if (selectedProductId) {
            apiFetch({ path: `/wc/v3/products/${selectedProductId}` })
                .then((product) => {
                    setSearchTerm(product.name);
                });
        }
    }, [selectedProductId]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                setSearchResults([]); // Clear search results on click outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (key) => (value) => setAttributes({ [key]: value });

    // Fetch products as user types or when TextControl is focused
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);

        if (!searchTerm) {
            // Fetch default products on focus if no search term
            apiFetch({ path: `/wc/v3/products?per_page=10` })
                .then((data) => {
                    const results = data.map((product) => ({
                        label: product.name,
                        value: product.id,
                    }));
                    setSearchResults(results);
                });
            return;
        }

        setIsLoading(true);
        apiFetch({ path: `/wc/v3/products?search=${searchTerm}&per_page=20` })
            .then((data) => {
                const results = data.map((product) => ({
                    label: product.name,
                    value: product.id,
                }));
                setSearchResults(results);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const handleProductSelect = (product) => {
        setAttributes({ selectedProductId: product.value });
        setSearchTerm(product.label); // Set the search term to the selected product's name
        setSearchResults([]); // Clear search results after selecting a product
    };

    return (
        <>
            <ToggleControl
                label={__('Use Product Rating')}
                checked={useProductRating}
                onChange={handleChange('useProductRating')}
            />
            {useProductRating && (
                <>
                    <TextControl
                        label={__('Search Product')}
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => handleSearch(searchTerm)} // Suggest a few products on focus
                        placeholder={__('Type to search...')}
                        className="brandy-product-search-term-input"
                    />
                    {isLoading && <Spinner />}
                    <ul className="brandy-product-search-results" ref={resultsRef}>
                        {searchResults.map((product) => (
                            <li
                                key={product.value}
                                onClick={() => handleProductSelect(product)}
                                style={{ cursor: 'pointer' }}
                            >
                                {product.label}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
