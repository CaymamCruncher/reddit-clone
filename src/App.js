import { Fragment, React, useEffect, useContext } from "react";
import PostDashboard from "./components/PostDashboard";
import PostView from "./components/PostView";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import { checkForUser } from "./utils/api";
import { ReactComponent as SearchIcon } from "./images/search.svg";
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
			<header className="container">
				{/* turn into own component in the future? */}
				<h1>
					<Link to="/">Breaddit</Link>
				</h1>
				<nav>
					<form
						onSubmit={
							{
								/* Add search function */
							}
						}
					>
						<input placeholder="Search"></input>
						<button>
							<SearchIcon />
						</button>
					</form>
					<a href="/">Popular</a>
					<a href="/">New</a>
					<Link to="/login">Login</Link>
					<Link to="/addpost">Add Post</Link>
				</nav>
			</header>
			<main className="container">
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
