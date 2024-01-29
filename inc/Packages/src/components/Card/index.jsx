import CollapseMenu from "../CollapseMenu";
import "./index.scss";

export default function Card({ children, ...rest }) {
  return (
    <CollapseMenu className="styles-card" {...rest}>
      {children}
    </CollapseMenu>
  );
}
