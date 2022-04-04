import {
	Fragment,
	React,
	useEffect,
	useContext,
	useState,
	useRef,
} from "react";
import PostDashboard from "./components/PostDashboard";
import PostView from "./components/PostView";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import { checkForUser } from "./utils/api";
import { ReactComponent as SearchIcon } from "./images/search.svg";
import "./styles/css/App.css";
import { UserContext } from "./context/UserContext";
import { Route, Link, Routes } from "react-router-dom";

function App() {
	const { updateUser, user } = useContext(UserContext);
	const [search, updateSearch] = useState("");
	const searchText = useRef(null);
	useEffect(() => {
		if (user.id === "Guest") {
			updateUser({
				id: "Processing",
				username: "Processing",
				votedPosts: {},
			});
			checkForUser()
				.then(({ user }) => {
					console.log(user);
					updateUser(user);
				})
				.catch((err) =>
					updateUser({
						id: "Guest",
						username: "Guest",
						votedPosts: {},
					})
				);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Fragment>
			<header className="container">
				{/* turn into own component in the future? */}
				<h1>
					<Link to="/">Breaddit</Link>
				</h1>
				<nav>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							updateSearch(searchText.current.value);
						}}
					>
						<input placeholder="Search" ref={searchText} />
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
				<Routes>
					<Route exact path="/" element={<PostDashboard filter={search} />} />
					<Route exact path="/posts/:id" element={<PostView />} />
					<Route path="/posts/:id/edit" element={<EditPost />} />
					<Route path="/login" element={<Login />} />
					<Route path="/addpost" element={<AddPost />} />
				</Routes>
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
