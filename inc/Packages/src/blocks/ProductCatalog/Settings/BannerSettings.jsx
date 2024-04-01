import { MediaUpload } from "@wordpress/block-editor";
import PanelBody from "../../../components/PanelBody";
import { ProductCatalogContext } from "../edit";
import { useContext } from "@wordpress/element";
import { Placeholder,TextControl,TextareaControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function BannerSettings() {
    const { attributes, setAttributes } = useContext(ProductCatalogContext);
    const {primary,secondary} = attributes.banner_settings;

    const onSelectBannerMedia = (key) => (media) => {
        setAttributes({
            banner_settings: {
              ...attributes.banner_settings,
              [key]:{
                ...attributes.banner_settings[key],
                mediaID: !media || !media.url ? null : media.id,
                imageURL: !media || !media.url ? '' : media.url
              }
            }
        });
    };
   
    const doRemoveBannerImage = (key) => { 
        setAttributes({
            banner_settings: {
              ...attributes.banner_settings,
              [key]:{
                ...attributes.banner_settings[key],
                mediaID: null,
                imageURL: ''
              }
            }
        });
    };
   
    const doChangeBannerText = ( type, key ) => (value) => {
        setAttributes({
            banner_settings: {
              ...attributes.banner_settings,
              [type]:{
                ...attributes.banner_settings[type],
                [key]: value,
              }
            }
        });
        
    }
    
    const bannerEditorSetting = ( key ) => {
        const banner = attributes.banner_settings[key];
        const titleBody = 'primary' === key ? __("Primary Banner", "brandy") : __("Secondary Banner", "brandy")
        return (
            <>
                <PanelBody title={ titleBody }>
                    <p>{__("Upload an image file here:", "brandy")}</p>
                    <Placeholder
                        icon="media-document"
                        label={__("Upload an Image", "brandy")} 
                        instructions={__("Upload an image file here.", "brandy")} 
                    >
                    <MediaUpload
                        onSelect={onSelectBannerMedia(key)}
                        allowedTypes={['image']}
                        value={banner.mediaID}
                        render={({ open }) => ( <button onClick={open}>{__("Upload an Image", "brandy")} </button>
                        )}
                    />
                    </Placeholder>
                    {banner.imageURL && (
                        <div className="brandy-banner-image-container">
                            <img src={banner.imageURL} alt={__("Upload an Image", "brandy")} />
                            <a href="#" className="brandy-remove-image-button" onClick={()=>doRemoveBannerImage(key)}>{__("Remove Image", "brandy")}</a>
                        </div>
                    )}
                    <div className="product-catalog-banner-content-wrapper">
                        <TextControl
                            label={__("Title", "brandy")}
                            value={ banner.title }
                            onChange={doChangeBannerText(key,"title")}
                            type="text"
                        />
                        <TextareaControl
                            label="Textarea"
                            rows={2}
                            value={ banner.subtitle }
                            onChange={ doChangeBannerText(key,"subtitle") }
                        />
                    </div>
                </PanelBody>
            </>
        )
    }
    return (
        <>
            <div className="product-catalog-banner-wrapper product-catalog-primary-banner-settings">
                {bannerEditorSetting("primary")}
            </div>
            <div className="product-catalog-banner-wrapper product-catalog-secondary-banner-settings">
                {bannerEditorSetting("secondary")}
            </div>
        </>
    );
}
