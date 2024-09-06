import Layout from "./Layout";
import Settings from "./Settings";
import Values from "./Values";

export default function AllInspectorSettings(props) {
  return (
    <>
      <Settings {...props} />
      <Values {...props} />
      <Layout {...props} />
    </>
  );
}
