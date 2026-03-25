import {
	Box,
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttachmentCard from "./AttachmentCard";

interface AttachmentType {
	id: number;
	filename: string;
	url: string;
}

export default function Attachments() {
	const { id } = useParams(); // ID du ticket
	const [attachments, setAttachments] = useState<AttachmentType[]>([]);
	const [isUpdate, setIsUpdate] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState("");

	const handleAdd = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await fetch(
				`http://localhost:3310/api/tickets/${id}/attachments`,
				{
					method: "POST",
					body: formData,
				},
			);

			if (!res.ok) {
				const err = await res.json();
				setError(err.message || "Erreur lors de l'upload");
				return;
			}

			setFile(null);
			setIsUpdate(true);
			setError("");
		} catch {
			setError("Impossible d'ajouter l'attachment");
		}
	};

	useEffect(() => {
		fetch(`http://localhost:3310/api/tickets/${id}/attachments`)
			.then((response) => {
				if (!response.ok) throw new Error("Ticket introuvable");
				return response.json();
			})
			.then((data) => setAttachments(data))
			.then(() => setIsUpdate(false))
			.catch((error) => setError(error.message));
	}, [id, isUpdate]);

	return (
		<Box>
			<Typography variant="h4" sx={{ mt: 5 }}>
				Attachments du ticket {id}
			</Typography>

			{error && (
				<Typography color="error" sx={{ mt: 2 }}>
					{error}
				</Typography>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAdd();
				}}
			>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="space-between"
					marginY={2}
					sx={{ mt: 5 }}
				>
					<Button variant="contained" component="label" sx={{ width: "70%" }}>
						Choisir un fichier
						<input
							type="file"
							hidden
							onChange={(e) => setFile(e.target.files?.[0] || null)}
						/>
					</Button>

					<Button type="submit" variant="contained" sx={{ width: "30%" }}>
						Ajouter
					</Button>
				</Stack>
			</form>

			<TableContainer component={Paper} sx={{ mt: 2 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									width: "70%",
									fontWeight: "bold",
									bgcolor: "primary.main",
									color: "white",
									textAlign: "center",
								}}
							>
								Fichier
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									bgcolor: "primary.main",
									color: "white",
									textAlign: "center",
								}}
							>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{attachments.map((att) => (
							<AttachmentCard
								key={att.id}
								attachment={att}
								SetIsUpdate={setIsUpdate}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
