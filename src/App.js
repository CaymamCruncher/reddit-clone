import { Fragment, React, useEffect, useContext } from "react";
import PostDashboard from "./components/PostDashboard";
import PostView from "./components/PostView";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import { checkForUser } from "./utils/api";
import "./styles/css/App.css";
import { UserContext } from "./context/UserContext";
import { Route, Link } from "react-router-dom";

function App() {
	const { updateUser, user } = useContext(UserContext);
	useEffect(() => {
		if (user.id === "Guest") {
			checkForUser()
				.then(({ user }) => {
					console.log(user);
					updateUser(user);
				})
				.catch((err) => console.warn(err));
		}
	}, [updateUser, user.id]);
	return (
		<Fragment>
			<header>
				{/* turn into own component in the future? */}
				<div className="container">
					<h1>Breaddit</h1>
					<nav>
						<div>
							<input></input>
							<button>Submit</button>
						</div>
						<Link to="/">Home</Link>
						<a href="/">Popular</a>
						<a href="/">New</a>
						<Link to="/login">Login</Link>
						<Link to="/addpost">Add Post</Link>
					</nav>
				</div>
			</header>
			<main>
				<Route exact path="/" component={PostDashboard} />
				<Route exact path="/posts/:id" component={PostView} />
				<Route path="/posts/:id/edit" component={EditPost} />
				<Route path="/login" component={Login} />
				<Route path="/addpost" component={AddPost} />
			</main>
			<footer>
				{/* turn into own component in the future? */}
				<div className="container">
					<small>&copy;2021 Breaddit Incorporated</small>
				</div>
			</footer>
		</Fragment>
	);
}

export default App;
