import {
	Box,
	Button,
	Divider,
	MenuItem,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchWithToken } from "../../utils/api";
import AttachmentsPanel from "./AttachmentsPanel";
import Comments from "./Comments";

export default function TicketEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useAuth();

	const redirectActionUser = () => {
		if (user?.role === "admin") {
			navigate("/tickets");
		} else {
			navigate("/client/dashboard");
		}
	};

	const handleDelete = async () => {
		if (!window.confirm("Supprimer ce ticket définitivement ?")) return;
		await fetchWithToken(`http://localhost:3310/api/tickets/${id}`, {
			method: "DELETE",
		});
		redirectActionUser();
	};

	const [title, setTitle] = useState("");
	const [status, setStatus] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [category_id, setCategoryId] = useState("");
	const [_attachment, _setAttachment] = useState<File | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await fetchWithToken(`http://localhost:3310/api/tickets/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title,
				description,
				priority,
				category_id,
				status,
				client_id: user?.id,
				technician_id: null,
			}),
		});
		redirectActionUser();
	};

	useEffect(() => {
		fetchWithToken(`http://localhost:3310/api/tickets/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setTitle(data.title);
				setDescription(data.description);
				setStatus(data.status);
				setPriority(data.priority);
				setCategoryId(data.category_id);
			})
			.catch((err) => console.error(err));
	}, [id]);

	return (

	);
}