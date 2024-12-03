import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const showToast = useShowToast();
	const handleLogin = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
			<div style={{ maxWidth: "400px", width: "100%", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", borderRadius: "8px", backgroundColor: "#fff" }}>
				<h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "16px" }}>Login</h2>

				<div style={{ marginBottom: "16px" }}>
					<label style={{ display: "block", marginBottom: "8px" }}>Username</label>
					<input
						type="text"
						value={inputs.username}
						onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
						style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
					/>
				</div>
				<div style={{ marginBottom: "16px" }}>
					<label style={{ display: "block", marginBottom: "8px" }}>Password</label>
					<div style={{ position: "relative" }}>
						<input
							type={showPassword ? "text" : "password"}
							value={inputs.password}
							onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
							style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((showPassword) => !showPassword)}
							style={{
								position: "absolute",
								right: "10px",
								top: "50%",
								transform: "translateY(-50%)",
								background: "transparent",
								border: "none",
								cursor: "pointer",
							}}
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
				</div>

				<div style={{ marginBottom: "16px" }}>
					<button
						onClick={handleLogin}
						style={{
							width: "100%",
							padding: "12px",
							backgroundColor: "#4CAF50",
							color: "#fff",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</div>

				<div style={{ textAlign: "center" }}>
					<p>
						Don't have an account?{" "}
						<a
							href="#"
							onClick={() => setAuthScreen("signup")}
							style={{ color: "#1E90FF", textDecoration: "none" }}
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
