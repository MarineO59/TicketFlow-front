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

export default function login() {
	return (
		<Box sx={{
			minHeight: "50vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			p: 2,
		}}>
			<Paper elevation={3}
				sx={{ p: 4, width: "100%", maxWidth: 480, borderRadius: 3 }}>
				{/* Header */}
				<Typography variant="h5" fontWeight={700} textAlign="center" mb={0.5}>
					Create your account
				</Typography>
			</Paper>
		</Box>
	);
}
