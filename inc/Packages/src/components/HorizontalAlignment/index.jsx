import ButtonGroup from "../ButtonGroup";
import "./index.scss";

const options = [
  {
    label: (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.86111 5V11H17.3999V5H5.86111ZM0.616211 16H2.18968V0H0.616211V16Z"
          fill="#5A6D80"
        />
      </svg>
    ),
    value: "left",
  },
  {
    label: (
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 5H9.3V0H7.7V5H0.5V11H7.7V16H9.3V11H16.5V5Z"
          fill="#5A6D80"
        />
      </svg>
    ),
    value: "center",
  },
  {
    label: (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.550781 11H12.0896V5H0.550781V11ZM15.761 0V16H17.3345V0H15.761Z"
          fill="#5A6D80"
        />
      </svg>
    ),
    value: "right",
  },
];

export default function HorizontalAlignment({ onChange, selected }) {
  return (
    <ButtonGroup
      options={options}
      onChange={onChange}
      selected={selected}
      className="brandy-btn-group-icons"
    />
  );
}
