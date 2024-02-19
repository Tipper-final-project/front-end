const Login = () => {
    return (
      <div className="login-card">
      <div className="card " style={{width: 540 + 'px'}} >
      <div className="card-header">
    Login/Register
  </div>
  <div className="card-body">
  <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Username</span>
  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
<div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Password</span>
    <input type="text" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
  </div>
    <a href="#" className="btn btn-primary">Login</a>
  </div>
</div>
  </div>
    )
}

export default Login;