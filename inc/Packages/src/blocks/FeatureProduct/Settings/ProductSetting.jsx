import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ProductContext } from "../edit";
import { SelectControl } from "@wordpress/components";
import { useSelect } from '@wordpress/data';

export default function ProductSetting() {
  const { attributes, setAttributes } = useContext(ProductContext);

  // Fetch featured products using the obtained IDs
  const featuredProducts = useSelect((select) => {
      return select('core').getEntityRecords('postType', 'product', { featured: true });
  });
  
  // Format products for SelectControl options
  const products = featuredProducts
      ? featuredProducts.map(product => ({ value: product.id.toString(), label: product.title }))
      : [];
      
  // Limit to 5 featured products
  const limitedProducts = products.slice(0, 20);
 
  return (
    <>
      <SelectControl
            label={__("Select a product","brandy-blocks")}
            value={attributes.product_id}
            options={[
              { label: __("Select a product", "brandy-blocks"), value: '0' },
              ...limitedProducts.map(product => ({
                  label: product.label.rendered,
                  value: +product.value,
              })),
            ]}
            onChange={(newValue) => {
              setAttributes({ product_id: +newValue });
            }}
        />
    </>
  );
}
