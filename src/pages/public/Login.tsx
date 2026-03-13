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
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

export default function login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	return (
		<Box
			sx={{
				minHeight: "50vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 2,
			}}
		>
			<Paper
				elevation={3}
				sx={{ p: 4, width: "100%", maxWidth: 480, borderRadius: 3 }}
			>
				{/* Header */}
				<Typography variant="h5" fontWeight={700} textAlign="center" mb={4}>
					Se connecter à votre compte
				</Typography>

				{/* OAuth Buttons */}
				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					<Button
						fullWidth
						variant="outlined"
						startIcon={<GoogleIcon />}
						sx={{ textTransform: "none" }}
					>
						Google
					</Button>
					<Button
						fullWidth
						variant="outlined"
						startIcon={<GitHubIcon />}
						sx={{ textTransform: "none" }}
					>
						GitHub
					</Button>
				</Box>

				{/* Divider */}
				<Divider sx={{ my: 2 }}>
					<Typography variant="caption" color="text.secondary">
						ou se connecter avec votre email
					</Typography>
				</Divider>

				<Box>
					{/* Email */}
					<TextField
						label="Email address"
						type="email"
						fullWidth
						sx={{ mb: 2 }}
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<TextField
						fullWidth
						label="Password"
						name="password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						sx={{ mb: 4 }}
						InputProps={{
							endAdornment: (
								// InputAdornment + IconButton: the eye icon inside the input
								<InputAdornment position="end">
									<IconButton
										onClick={() => setShowPassword((p) => !p)}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Button type="submit"
						variant="contained"
						fullWidth
						size="large"
						disabled={isLogin}
						sx={{ textTransform: "none", fontWeight: 600 }}>
						{"Se connecter"}
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}
