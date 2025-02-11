import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <div>
        <h3>Ohh! Page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back</Link>
      </div>
    );
  }
  return (
    <div>
      <h3>Something went wrong</h3>
    </div>
  );
};

export default Error;
