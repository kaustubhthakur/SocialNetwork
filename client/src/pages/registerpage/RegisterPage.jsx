import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import useShowToast from "../../hooks/useShowToast";
import userAtom from "../../atoms/userAtom";
export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
	});

	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);

	const handleSignup = async () => {
		try {
			const res = await fetch("http://localhost:9000/auth/register", {
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
            console.log(data);
            alert(`${inputs.username} your registration completed....`)
        
		} catch (error) {
			showToast("Error", error, "error");
		}
	};

	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
			<div style={{ width: "100%", maxWidth: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
				<h1 style={{ textAlign: "center", marginBottom: "20px" }}>Sign up</h1>
				<div style={{ marginBottom: "15px" }}>
					<label>Username</label>
					<input
						type="text"
						style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "10px" }}
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						value={inputs.username}
					/>
				</div>
				<div style={{ marginBottom: "15px" }}>
					<label>Email address</label>
					<input
						type="email"
						style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "10px" }}
						onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						value={inputs.email}
					/>
				</div>
				<div style={{ marginBottom: "20px" }}>
					<label>Password</label>
					<div style={{ display: "flex", alignItems: "center" }}>
						<input
							type={showPassword ? "text" : "password"}
							style={{ flex: 1, padding: "8px", marginTop: "5px" }}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							value={inputs.password}
						/>
						<button
							type="button"
							style={{ marginLeft: "10px", padding: "5px 10px" }}
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
				</div>
				<div style={{ textAlign: "center", marginBottom: "15px" }}>
					<button
						type="button"
						style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
						onClick={handleSignup}
					>
						Sign up
					</button>
				</div>
				<p style={{ textAlign: "center" }}>
					Already a user?{" "}
					<span
						style={{ color: "blue", cursor: "pointer" }}
						onClick={() => setAuthScreen("login")}
					>
						Login
					</span>
				</p>
			</div>
		</div>
	);
}
