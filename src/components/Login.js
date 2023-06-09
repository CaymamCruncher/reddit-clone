import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../utils/api";

function Login() {
	const { updateUser } = useContext(UserContext);
	const [username, updateUsername] = useState("");
	const [password, updatePassword] = useState("");
	const navigate = useNavigate();

	function loginUser(e) {
		e.preventDefault();
		authenticateUser(username, password).then((res) => {
			console.log(res);
			if (res.result) {
				console.log(res.user);
				updateUser({
					id: res.user.id,
					name: res.user.username,
					votedPosts: res.user.votedPosts,
				});
				alert(`Signed in as ${username}`);
				navigate(-1);
			} else {
				alert("Username or password was wrong");
			}
		});
	}

	return (
		<article>
			<h2>Login</h2>
			<form onSubmit={loginUser} className="two-col">
				<div>
					<label>Username</label>
					<input
						id="username"
						name="username"
						type="text"
						value={username}
						onChange={(e) => updateUsername(e.target.value)}
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						id="password"
						name="password"
						type="password"
						value={password}
						onChange={(e) => updatePassword(e.target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</article>
	);
}

export default Login;
