import Login from "../components/Login";
import { login } from "../redux/auth";

import { connect } from "react-redux";

const mapActionsToProps = { login };

export default connect(null, mapActionsToProps)(Login);
