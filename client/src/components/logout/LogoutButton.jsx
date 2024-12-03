import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
	const setUser = useSetRecoilState(userAtom);
	const showToast = useShowToast();

	const handleLogout = async () => {
		try {
			const res = await fetch("http://localhost:9000/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			localStorage.removeItem("user-threads");
			setUser(null);
		} catch (error) {
			showToast("Error", error, "error");
		}
	};

	return (
		<button
			onClick={handleLogout}
			style={{
				position: "fixed",
				top: "30px",
				right: "30px",
				padding: "8px 12px",
				backgroundColor: "#FF6347",
				color: "white",
				border: "none",
				borderRadius: "4px",
				cursor: "pointer",
				fontSize: "20px",
			}}
		>
			<FiLogOut size={20} />
		</button>
	);
};

export default LogoutButton;
