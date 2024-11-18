import React, { useState } from "react";
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
			const res = await fetch("http://localhost:8000/auth/register", {
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
		}
	};

	return (
		<div style={styles.container}>
			<div style={styles.formContainer}>
				<h2 style={styles.heading}>Sign up</h2>
				<div style={styles.formGroup}>
					<label style={styles.label}>Username</label>
					<input
						type="text"
						value={inputs.username}
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						style={styles.input}
					/>
				</div>
				<div style={styles.formGroup}>
					<label style={styles.label}>Email address</label>
					<input
						type="email"
						value={inputs.email}
						onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						style={styles.input}
					/>
				</div>
				<div style={styles.formGroup}>
					<label style={styles.label}>Password</label>
					<div style={styles.passwordGroup}>
						<input
							type={showPassword ? "text" : "password"}
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							style={styles.input}
						/>
						<button
							onClick={() => setShowPassword((prev) => !prev)}
							style={styles.passwordToggle}
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
				</div>
				<div style={styles.buttonContainer}>
					<button onClick={handleSignup} style={styles.button}>
						Sign up
					</button>
				</div>
				<div style={styles.loginPrompt}>
					<p>
						Already a user?{" "}
						<button onClick={() => setAuthScreen("login")} style={styles.linkButton}>
							Login
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

const styles = {
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "100vh",
		backgroundColor: "#f0f0f0",
	},
	formContainer: {
		backgroundColor: "#fff",
		padding: "20px",
		borderRadius: "8px",
		boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
		width: "100%",
		maxWidth: "400px",
	},
	heading: {
		textAlign: "center",
		fontSize: "2rem",
		marginBottom: "20px",
	},
	formGroup: {
		marginBottom: "15px",
	},
	label: {
		display: "block",
		marginBottom: "8px",
		fontWeight: "bold",
	},
	input: {
		width: "100%",
		padding: "10px",
		borderRadius: "4px",
		border: "1px solid #ccc",
	},
	passwordGroup: {
		display: "flex",
		alignItems: "center",
	},
	passwordToggle: {
		backgroundColor: "transparent",
		border: "none",
		color: "#007bff",
		cursor: "pointer",
	},
	buttonContainer: {
		textAlign: "center",
	},
	button: {
		width: "100%",
		padding: "12px",
		backgroundColor: "#007bff",
		color: "#fff",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "16px",
	},
	loginPrompt: {
		textAlign: "center",
		marginTop: "20px",
	},
	linkButton: {
		backgroundColor: "transparent",
		border: "none",
		color: "#007bff",
		cursor: "pointer",
	},
};
