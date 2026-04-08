import {
    Box,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/api";

interface UserType {
    id: number;
    firstname: string;
    lastname: string;
    role: string;
    email: string;
    password: string;
}

export default function Technicians() {
    const [technicians, setTechnicians] = useState<UserType[]>([]);
    const [isUpdate, SetIsUpdate] = useState(false);

    useEffect(() => {
        fetchWithToken(`${import.meta.env.VITE_API_URL}/api/users/`)
            .then((response) => response.json())
            .then((data) => setTechnicians(data.filter((user) => user.role === "technician")))
            .catch((error) => console.error(error))
    }, [isUpdate])

    return (
        <div>Technicians</div>
    )
}