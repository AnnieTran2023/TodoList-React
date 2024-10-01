import Todolist from "./components/Todolist";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Todos</Typography>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Todolist />
      </Box>
      <CssBaseline />
    </Container>
  );
}

export default App;
