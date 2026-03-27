import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bonjour Client x, ceci est votre dashboard
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/tickets/new")}
        >
          Nouveau Ticket
        </Button>
      </Box>
    </Container>
  );
}