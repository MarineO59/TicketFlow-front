import DeleteIcon from "@mui/icons-material/Delete";
import {
	Avatar,
	Box,
	IconButton,
	List,
	ListItem,
	Paper,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface CommentType {
	id: number;
	content: string;
	author_id: number;
	ticket_id: number;
	created_at: string;
}

export default function Comments() {
	const [comment, setComment] = useState<CommentType[]>([]);

	useEffect(() => {
		const afficheComments = async () => {
			const response = await fetch("http://localhost:3310/api/comments");
			const data = await response.json();
			setComment(data);
		};
		afficheComments();
	}, []);

	const handleDelete = async (id: number) => {
		const response = await fetch(`http://localhost:3310/api/comments/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			setComment(comment.filter((c) => c.id !== id));
		}
	};

	return (
		<Paper
			elevation={0}
			sx={{
				display: "flex",
				flexDirection: "column",
				height: 520,
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 3,
				overflow: "hidden",
			}}
		>
			{/* Header */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1.5,
					px: 2,
					py: 1.5,
					borderBottom: "1px solid",
					borderColor: "divider",
					bgcolor: "grey.50",
				}}
			>
				<Avatar
					sx={{
						bgcolor: "primary.light",
						color: "primary.dark",
						width: 36,
						height: 36,
					}}
				>
					S
				</Avatar>
				<Box>
					<Typography variant="subtitle2">Support TicketFlow</Typography>
					<Typography variant="caption" color="success.main">
						● En ligne
					</Typography>
				</Box>
			</Box>

			{/* Messages */}
			<List
				sx={{
					flex: 1,
					overflowY: "auto",
					px: 2,
					py: 1,
					display: "flex",
					flexDirection: "column",
					gap: 1,
				}}
			>
				{comment.map((msg) => {
					const isUser = msg.author_id === 3;
					return (
						<ListItem
							key={msg.id}
							sx={{
								display: "flex",
								flexDirection: isUser ? "row-reverse" : "row",
								alignItems: "flex-end",
								gap: 1,
								p: 0,
							}}
						>
							{!isUser && (
								<Avatar
									sx={{
										width: 28,
										height: 28,
										fontSize: 12,
										bgcolor: "primary.light",
										color: "primary.dark",
									}}
								>
									S
								</Avatar>
							)}
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: isUser ? "flex-end" : "flex-start",
								}}
							>
								<Paper
									elevation={0}
									sx={{
										px: 1.5,
										py: 1,
										maxWidth: 280,
										bgcolor: isUser ? "primary.main" : "grey.100",
										color: isUser ? "primary.contrastText" : "text.primary",
										borderRadius: isUser
											? "16px 16px 4px 16px"
											: "16px 16px 16px 4px",
									}}
								>
									<Typography variant="body2">{msg.content}</Typography>
								</Paper>
								<IconButton color="error" onClick={() => handleDelete(msg.id)}>
									<DeleteIcon fontSize="small" />
								</IconButton>
								<Typography
									variant="caption"
									color="text.disabled"
									sx={{ mt: 0.5 }}
								>
									{msg.created_at}
								</Typography>
							</Box>
							{isUser && (
								<Avatar
									sx={{
										width: 28,
										height: 28,
										fontSize: 12,
										bgcolor: "success.light",
										color: "success.dark",
									}}
								>
									M
								</Avatar>
							)}
						</ListItem>
					);
				})}
			</List>
		</Paper>
	);
}
