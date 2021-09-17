import { createContext, useState } from "react";

const UserContext = createContext();

function UserContextProvider({ children }) {
	const [user, updateUser] = useState("Guest");

	return (
		<UserContext.Provider value={{ user, updateUser }}>
			{children}
		</UserContext.Provider>
	);
}

export { UserContext, UserContextProvider };
