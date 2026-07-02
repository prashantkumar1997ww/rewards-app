import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div data-testid="loader" className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  );
}
