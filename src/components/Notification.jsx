import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function Notification({ message }) {
  return (
    <div className="mt-4">
      <Alert variant="danger">{message}</Alert>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
