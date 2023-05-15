import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Error = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <p>This page does not exist</p>
      <Button variant="danger" type="submit" onClick={handleClick}>
        Home
      </Button>
    </div>
  );
};

export default Error;
