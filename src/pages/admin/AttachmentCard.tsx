import { Button, Stack, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";

interface AttachmentType {
	id: number;
	filename: string;
	url: string;
}

interface Props {
	attachment: AttachmentType;
	SetIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AttachmentCard({ attachment, SetIsUpdate }: Props) {
	const [isEdit, setIsEdit] = useState(false);
	const [filename, setFilename] = useState("");

	const handleDelete = async () => {
		const response = await fetch(
			`http://localhost:3310/api/attachments/${attachment.id}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			},
		);
		if (response.ok) SetIsUpdate((prev) => !prev);
	};

	const handleSave = async () => {
		const newData = {
			filename: filename || attachment.filename,
		};

		const response = await fetch(
			`http://localhost:3310/api/attachments/${attachment.id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newData),
			},
		);

		if (response.ok) {
			SetIsUpdate((prev) => !prev);
			setIsEdit(false);
			setFilename("");
		}
	};

	return (
		<TableRow>
			<TableCell>
				{isEdit ? (
					<TextField
						size="small"
						variant="outlined"
						value={filename}
						onChange={(e) => setFilename(e.target.value)}
						placeholder={attachment.filename}
					/>
				) : (
					<a href={attachment.url} target="_blank" rel="noreferrer">
						{attachment.filename}
					</a>
				)}
			</TableCell>

			<TableCell>
				{isEdit ? (
					<Stack direction="row" spacing={2}>
						<Button variant="contained" onClick={handleSave}>
							Save
						</Button>
						<Button
							variant="outlined"
							color="error"
							onClick={() => setIsEdit(false)}
						>
							Cancel
						</Button>
					</Stack>
				) : (
					<Stack direction="row" spacing={2}>
						<Button variant="contained" onClick={() => setIsEdit(true)}>
							Edit
						</Button>
						<Button variant="outlined" color="error" onClick={handleDelete}>
							Delete
						</Button>
					</Stack>
				)}
			</TableCell>
		</TableRow>
	);
}
