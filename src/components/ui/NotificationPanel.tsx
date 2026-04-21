import NotificationsIcon from "@mui/icons-material/Notifications";
import {
	Badge,
	Box,
	Divider,
	IconButton,
	Menu,
	Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { STATUS_LABELS } from "../../pages/technicien/TechnicienDashboard.utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

interface StatusNotification {
	type: "status_change";
	id: number;
	ticketId: number;
	ticketTitle: string;
	oldStatus: string;
	newStatus: string;
	seenAt: string;
}

interface NewTicketNotification {
	type: "new_ticket";
	id: number;
	ticketId: number;
	ticketTitle: string;
	seenAt: string;
}

type Notification = StatusNotification | NewTicketNotification;

export default function NotificationPanel() {
	const { user } = useAuth();
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const socketRef = useRef<Socket | null>(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		if (!user) return;

		const socket = io(API_URL, { withCredentials: true });
		socketRef.current = socket;

		// Rejoindre la room selon le rôle
		socket.emit("join", { role: user.role, userId: user.id });

		// Admin / technicien : nouveau ticket créé
		if (user.role === "admin" || user.role === "technician") {
			socket.on("new_ticket", (data: { id: number; title: string }) => {
				setNotifications((prev) => [
					{
						type: "new_ticket",
						id: Date.now(),
						ticketId: data.id,
						ticketTitle: data.title,
						seenAt: new Date().toLocaleTimeString("fr-FR"),
					},
					...prev,
				]);
			});
		}

		// Client : changement de statut sur ses tickets
		if (user.role === "client") {
			socket.on(
				"ticket_status_changed",
				(data: {
					ticketId: number;
					ticketTitle: string;
					oldStatus: string;
					newStatus: string;
				}) => {
					setNotifications((prev) => [
						{
							type: "status_change",
							id: Date.now(),
							ticketId: data.ticketId,
							ticketTitle: data.ticketTitle,
							oldStatus: data.oldStatus,
							newStatus: data.newStatus,
							seenAt: new Date().toLocaleTimeString("fr-FR"),
						},
						...prev,
					]);
				},
			);
		}

		return () => {
			socket.disconnect();
		};
	}, [user]);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);
	const handleClear = () => {
		setNotifications([]);
		handleClose();
	};

	const renderNotif = (notif: Notification) => {
		if (notif.type === "new_ticket") {
			return (
				<Box key={notif.id}>
					<Box sx={{ px: 2, py: 1.5 }}>
						<Typography variant="body2" fontWeight={500}>
							🎫 Nouveau ticket #{notif.ticketId}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{notif.ticketTitle}
						</Typography>
						<Typography variant="caption" color="text.disabled" display="block">
							{notif.seenAt}
						</Typography>
					</Box>
					<Divider />
				</Box>
			);
		}
		return (
			<Box key={notif.id}>
				<Box sx={{ px: 2, py: 1.5 }}>
					<Typography variant="body2" fontWeight={500}>
						Ticket #{notif.ticketId} — {notif.ticketTitle}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Statut passé de <strong>{STATUS_LABELS[notif.oldStatus]}</strong> à{" "}
						<strong>{STATUS_LABELS[notif.newStatus]}</strong>
					</Typography>
					<Typography variant="caption" color="text.disabled" display="block">
						{notif.seenAt}
					</Typography>
				</Box>
				<Divider />
			</Box>
		);
	};

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1 } }}
			>
				<Badge badgeContent={notifications.length} color="error">
					<NotificationsIcon />
				</Badge>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				PaperProps={{
					elevation: 3,
					sx: { mt: 1, width: 320, borderRadius: 2 },
				}}
			>
				<Box
					sx={{
						px: 2,
						py: 1.5,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="subtitle2" fontWeight={600}>
						Notifications
					</Typography>
					{notifications.length > 0 && (
						<Typography
							variant="caption"
							color="primary"
							sx={{ cursor: "pointer" }}
							onClick={handleClear}
						>
							Tout effacer
						</Typography>
					)}
				</Box>

				<Divider />

				{notifications.length === 0 ? (
					<Box sx={{ px: 2, py: 3, textAlign: "center" }}>
						<Typography variant="body2" color="text.secondary">
							Aucune notification
						</Typography>
					</Box>
				) : (
					notifications.map((notif) => renderNotif(notif))
				)}
			</Menu>
		</>
	);
}
