import PropTypes from "prop-types";

export const logger = (type, message, data) => {
  switch (type) {
    case "error":
      console.error(message, data);
      break;
    case "warn":
      console.warn(message, data);
      break;
    case "info":
      console.info(message, data);
      break;
  }
};

logger.propTypes = {
  type: PropTypes.oneOf(["error", "warn", "info"]).isRequired,
  message: PropTypes.string.isRequired,
  data: PropTypes.any,
};
