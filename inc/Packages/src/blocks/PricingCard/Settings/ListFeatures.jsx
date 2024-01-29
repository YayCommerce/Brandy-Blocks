import { __ } from "@wordpress/i18n";
import Label from "../../../components/Label";
import { ToggleControl } from "@wordpress/components";
import { useContext, useState } from "@wordpress/element";
import { PricingCardContext } from "../edit";
import SubLabel from "../../../components/SubLabel";
import "./ListFeatures.scss";
import ButtonGroup from "../../../components/ButtonGroup";

const AddButton = ({ style, onClick }) => {
  return (
    <span style={style} onClick={onClick}>
      <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.25 6.25V10.5H5.75V6.25H10V4.75H5.75V0.5H4.25V4.75H0V6.25H4.25Z"
          fill="#347BB5"
        />
      </svg>
    </span>
  );
};

export default function ListFeatures() {
  const { attributes, setAttributes } = useContext(PricingCardContext);
  const handleEnablingIcon = (v) => {
    setAttributes({
      icon_enabled: v,
    });
  };
  const handleAddFeature = () => {
    const newList = [
      ...attributes.features,
      {
        text: "New feature",
        status: "checked",
      },
    ];
    setAttributes({
      features: newList,
    });
  };

  return (
    <div className="pricing-settings-card-wrapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
          marginBottom: 10,
          borderBottom: "1px solid #F0F2F4",
        }}
      >
        <Label title={__("Enable icon", "brandy")} />
        <ToggleControl
          checked={attributes.icon_enabled ?? true}
          onChange={handleEnablingIcon}
        />
      </div>
      <div className="pricing-settings-card__list-item">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SubLabel title={__("List item", "brandy")} />
          <AddButton
            style={{ padding: 10, cursor: "pointer" }}
            onClick={handleAddFeature}
          />
        </div>
        <div className="pricing-settings-card__list-item__list">
          {attributes.features.map((i, index) => (
            <FeatureCard detail={i} position={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ detail, position }) => {
  const { attributes, setAttributes } = useContext(PricingCardContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    const newList = [...attributes.features];
    newList.splice(position, 1);
    setAttributes({
      features: [...newList],
    });
  };

  const handleChangeStatus = (v) => {
    const newList = [...attributes.features];
    newList[position].status = v;
    setAttributes({
      features: [...newList],
    });
  };
  return (
    <div
      className={`pricing-settings-card__list-item__card ${
        isOpen ? "active" : ""
      }`}
    >
      <div
        className="card-head"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="card-icon">
          {detail.status === "checked" ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
                fill="#347BB5"
              />
              <path d="M5 9.5L7.5 12L12.5 7" fill="#347BB5" />
              <path
                d="M5 9.5L7.5 12L12.5 7"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
                fill="#D1D9E0"
              />
              <path
                d="M12 6L6 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L12 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="card-text">{detail.text}</span>
        <span className="card-close" onClick={handleDelete}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6.11041L8.88854 10L10 8.88959L6.11146 5L10 1.11146L8.88959 0.00104748L5 3.88749L1.11146 0L0 1.11041L3.88854 5L0 8.88854L1.11041 10L5 6.11146V6.11041Z"
              fill="#C6D4E1"
            />
          </svg>
        </span>
      </div>

      {isOpen && (
        <div className="card-bottom">
          <div style={{ color: "#5A6D80" }}>
            {__("Check “Yes” if the feature is included.", "brandy")}
          </div>
          <ButtonGroup
            options={[
              { label: __("Yes", "brandy"), value: "checked" },
              { label: __("No", "brandy"), value: "unchecked" },
            ]}
            onChange={handleChangeStatus}
            selected={attributes.features[position].status}
          />
        </div>
      )}
    </div>
  );
};
