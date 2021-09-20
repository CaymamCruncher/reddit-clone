import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { authenticateUser } from "../utils/api";

function Login() {
	const { updateUser } = useContext(UserContext);
	const [username, updateUsername] = useState("");
	const [password, updatePassword] = useState("");
	const history = useHistory();

	function loginUser(e) {
		e.preventDefault();
		authenticateUser(username, password).then((res) => {
			if (res.result) {
				updateUser({ id: res.user.id, name: res.user.username });
				alert(`Signed in as ${username}`);
				history.goBack();
			} else {
				alert("Username or password was wrong");
			}
		});
	}

	return (
		<article>
			<h2>Login</h2>
			<form onSubmit={loginUser}>
				<label>Username</label>
				<input
					id="username"
					name="username"
					type="text"
					value={username}
					onChange={(e) => updateUsername(e.target.value)}
				/>
				<label>Password</label>
				<input
					id="password"
					name="password"
					type="password"
					value={password}
					onChange={(e) => updatePassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</article>
	);
}

export default Login;
