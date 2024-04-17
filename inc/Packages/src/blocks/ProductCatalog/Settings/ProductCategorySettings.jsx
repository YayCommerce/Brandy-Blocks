import { useContext } from "@wordpress/element";
import { CheckboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ProductCatalogContext } from "../edit";
import { useSelect } from '@wordpress/data';

export default function ProductCategorySettings() {
    
    const { attributes, setAttributes } = useContext(ProductCatalogContext);
    const selectedCategories = attributes.product_category_settings.selectedCategories;
    
    // Fetch WooCommerce product categories
    const productCategories = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'product_cat', { per_page: -1 });
    });

    if (!productCategories) {
        return __('Loading product categories...', 'brandy');
    }

    const handleCheckboxChange = (categoryId) => {
        const updatedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...attributes.product_category_settings.selectedCategories, categoryId]
        setAttributes({
            product_category_settings: {
              ...attributes.product_category_settings,
              selectedCategories: updatedCategories,
            },
          });
    };
    
  return (
    <>
        {productCategories.map(category => {
            return (<CheckboxControl
                key={category.id}
                label={category.name}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
            />)
        })}

    </>
  );
}
