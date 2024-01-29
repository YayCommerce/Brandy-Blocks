import Carousel from "./Carousel";
import ContentAlignment from "./ContentAlignment";
import Count from "./Count";
import Dimensions from "./Dimensions";
import Sort from "./Sort";

export default function General() {
  return (
    <div className="testimonial-settings__general">
      <Count />
      <ContentAlignment />
      <Sort />
      <Carousel />
      <Dimensions />
    </div>
  );
}
