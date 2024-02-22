const Error = ({ error }) => {
    return (
      <div className="error-display">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <pre>
          <i>{error.statusText || error.message}</i>
        </pre>
      </div>
    );
  };
  
  export default Error;