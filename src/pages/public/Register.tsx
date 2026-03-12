import {
	GitHub as GitHubIcon,
	Google as GoogleIcon,
	Visibility,
	VisibilityOff,
} from "@mui/icons-material";

import {
	Box,
	Button,
	Divider,
	IconButton,
	InputAdornment,
	LinearProgress,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";

import { useState } from "react";

interface FormErrors {
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

export default function Register() {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});

	const getPasswordStrength = (myPassword: string) => {
		let score = 0;
		if (myPassword.length >= 8) score++;
		if (/[0-9]/.test(myPassword)) score++;
		if (/[^a-zA-Z0-9]/.test(myPassword)) score++;
		if (myPassword.length >= 12) score++;
		return score;
	};

	const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
	const strengthColors = ["", "error", "warning", "info", "success"];
	const score = getPasswordStrength(password);

	const validationPassword = (): FormErrors => {
		const strongPassword: FormErrors = {};
		if (!firstname.trim()) strongPassword.firstname = "Required";
		if (!lastname.trim()) strongPassword.lastname = "Required";
		if (!email) strongPassword.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			strongPassword.email = "Invalid email";
		if (!password) strongPassword.password = "Required";
		else if (password.length < 8) strongPassword.password = "Min. 8 characters";
		else if (confirmPassword !== password)
			strongPassword.confirmPassword = "Password do not match";
		return strongPassword;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formErrors = validationPassword();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		setErrors({});
		setIsSubmitting(true);
	};

	return <div>add css here</div>;
}
