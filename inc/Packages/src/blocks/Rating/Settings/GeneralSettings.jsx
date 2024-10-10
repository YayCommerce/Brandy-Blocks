import { useContext } from "@wordpress/element";
import { RatingContext } from "../edit";
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import HorizontalAlignment from "../../../components/HorizontalAlignment";
import Label from "../../../components/Label";
import { PanelColorSettings } from '@wordpress/block-editor';
import ProductRatingSettings from "./ProductRatingSettings";
import { __ } from "@wordpress/i18n";

export default function GeneralSettings() {
    const { attributes, setAttributes } = useContext(RatingContext);
    const { starNumbers, rate, starSize, markColor, unmarkColor, spacing, useProductRating, alignment } = attributes;
    const handleChange = (key) => (value) => setAttributes({ [key]: value });
    return (
        <>
            <PanelBody title={__('General Settings')}>

                {!useProductRating && (
                    <>
                        <RangeControl
                            label={__('Number of Stars')}
                            value={starNumbers}
                            onChange={handleChange('starNumbers')}
                            min={1}
                            max={10}
                        />
                        <RangeControl
                            label={__('Rate')}
                            value={rate}
                            onChange={handleChange('rate')}
                            min={0}
                            max={10}
                            step={0.1}
                        />
                    </>
                )}
                <RangeControl
                    label={__('Star Size')}
                    value={starSize}
                    onChange={handleChange('starSize')}
                    min={5}
                    max={200}
                />
                <RangeControl
                    label={__('Spacing Between Stars')}
                    value={spacing}
                    onChange={handleChange('spacing')}
                    min={0}
                    max={20}
                />
                <div className="brandy-star-settings">
                    <Label title={__("Alignment")} />
                    <HorizontalAlignment
                        selected={alignment}
                        onChange={handleChange('alignment')}
                    />
                </div>
                <PanelColorSettings
                    title={__('Star Colors Settings')}
                    className="brandy-star-color-settings"
                    colorSettings={[
                        { value: markColor, onChange: handleChange('markColor'), label: __('Mark Color') },
                        { value: unmarkColor, onChange: handleChange('unmarkColor'), label: __('Unmark Color') },
                    ]}
                />
                <ProductRatingSettings />
            </PanelBody>

        </>
    );
}
