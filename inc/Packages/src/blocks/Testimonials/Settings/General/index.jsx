import Carousel from "./Carousel";
import ContentAlignment from "./ContentAlignment";
import Count from "./Count";
import LayoutStyle from "./LayoutStyle";
import Color from "./Color";
import Dimensions from "./Dimensions";
import Shadow from "./Shadow";
import Sort from "./Sort";

export default function General() {
  return (
    <div className="testimonial-settings__general">
      <Count />
      <LayoutStyle/>
      <Color/>
      <ContentAlignment />
      <Sort />
      <Carousel />
      <Dimensions />
      <Shadow />
    </div>
  );
}
