import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
	const [showRegisterModal, setShowRegisterModal] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	// Password validation function
	const validatePassword = (password) => {
		const minLength = password.length >= 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
		const hasNumber = /\d/.test(password);

		if (!minLength) {
			return "Password must be at least 8 characters long";
		}
		if (!hasUpperCase) {
			return "Password must contain at least one uppercase letter";
		}
		if (!hasLowerCase) {
			return "Password must contain at least one lowercase letter";
		}
		if (!hasSpecialChar) {
			return "Password must contain at least one special character";
		}
		if (!hasNumber) {
			return "Password must contain at least one number";
		}
		
		return ""; // No error
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		setPasswordError(validatePassword(newPassword));
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		// Validate password before proceeding
		const passwordValidationError = validatePassword(password);
		if (passwordValidationError) {
			setPasswordError(passwordValidationError);
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			setIsLoading(true);
			const response = await axios.post("https://server2-latest.onrender.com/User/register", {
				name,
				email,
				password,
			});

			if (response.status === 200) {
				const { message, user } = response.data;
				// First set success message explicitly
				setMessage("Registration successful!"); // Set a clear success message
				console.log("User Details:", user);

				// Give more time to see the message (5 seconds)
				setTimeout(() => {
					props.handleLoginClicks(true);
					setShowRegisterModal(false);
				}, 5000); // Increased to 5 seconds
			}
		} catch (error) {
			setMessage(error.response?.data?.message || "Registration failed!");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
			{showRegisterModal && (
				<>
					<h2>Register</h2>
					<form onSubmit={handleRegister}>
						<div style={{ marginBottom: "15px" }}>
							<label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								style={{
									width: "100%",
									padding: "8px",
									borderRadius: "4px",
									border: "1px solid #ccc",
								}}
								disabled={isLoading}
							/>
						</div>
						<div style={{ marginBottom: "15px" }}>
							<label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								style={{
									width: "100%",
									padding: "8px",
									borderRadius: "4px",
									border: "1px solid #ccc",
								}}
								disabled={isLoading}
							/>
						</div>
						<div style={{ marginBottom: "15px" }}>
							<label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
							<input
								type="password"
								value={password}
								onChange={handlePasswordChange}
								required
								style={{
									width: "100%",
									padding: "8px",
									borderRadius: "4px",
									border: "1px solid #ccc",
								}}
								disabled={isLoading}
							/>
							{passwordError && (
								<p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0" }}>
									{passwordError}
								</p>
							)}
							<p style={{ fontSize: "12px", margin: "5px 0 0 0", color: "#666" }}>
								Password must be at least 8 characters and include uppercase, lowercase, 
								number, and special character.
							</p>
						</div>
						<div style={{ marginBottom: "15px" }}>
							<label style={{ display: "block", marginBottom: "5px" }}>Confirm Password:</label>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								style={{
									width: "100%",
									padding: "8px",
									borderRadius: "4px",
									border: "1px solid #ccc",
								}}
								disabled={isLoading}
							/>
						</div>
						<button
							type="submit"
							disabled={isLoading || passwordError !== ""}
							style={{
								width: "100%",
								padding: "10px",
								backgroundColor: "#4CAF50",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: (isLoading || passwordError !== "") ? "not-allowed" : "pointer",
								opacity: (isLoading || passwordError !== "") ? 0.7 : 1,
							}}>
							{isLoading ? "Registering..." : "Register"}
						</button>
					</form>
					{message && (
						<p
							style={{
								marginTop: "15px",
								textAlign: "center",
								color: message.includes("successful") ? "#4CAF50" : "red",
							}}>
							{message}
						</p>
					)}

					<p style={{ marginTop: "15px", textAlign: "center" }}>
						Already have an account?{" "}
						<span
							onClick={props.handleLoginClicks}
							style={{
								color: "#4CAF50",
								cursor: "pointer",
								fontWeight: "bold",
								textDecoration: "underline",
							}}>
							Login here
						</span>
					</p>
				</>
			)}
		</div>
	);
};

export default Register;