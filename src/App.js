import { Fragment, React } from "react";
import PostDashboard from "./components/PostDashboard";
import PostView from "./components/PostView";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import "./styles/css/App.css";
import { UserContextProvider } from "./context/UserContext";
import { Route, Link } from "react-router-dom";

function App() {
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
						<a href="/">Home</a>
						<a href="/">Popular</a>
						<a href="/">New</a>
						<Link to="/login">Login</Link>
						<Link to="/addpost">Add Post</Link>
					</nav>
				</div>
			</header>
			<main>
				<UserContextProvider>
					<Route exact path="/" component={PostDashboard} />
					<Route path="/posts/:id" component={PostView} />
					<Route path="/login" component={Login} />
					<Route path="/addpost" component={AddPost} />
				</UserContextProvider>
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
