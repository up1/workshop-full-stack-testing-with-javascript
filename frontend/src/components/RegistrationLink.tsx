/* eslint-disable prettier/prettier */
const RegistrationLink = (props: { onRegister: boolean }) => {
  return (
    <div className="registration-container">
      {!props.onRegister ? (
        <div className="registration-link-container">
          <div className="github-info-container">
            <p>
              This is a simple app to demonstrate different automated testing
              techniques. 
            </p>
            <br/>
            <p>
              The frontend is built with React and the backend is built with
              Express.
            </p>
          </div>
          <p>Sign up for your free e-notes account.</p>
          <a className="nav-link" href="/register">
            Sign up
          </a>
        </div>
      ) : (
        <div className="registration-link-container">
          <p>Account created successfully!</p>
          <p>Please log in</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationLink;
