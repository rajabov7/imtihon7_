
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const auth = useAuth();
  const nav = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Project
        </Typography>
        {auth.user ? (
          <>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {auth.user.email}
            </Typography>
            <Button color="inherit" onClick={() => { auth.logout(); nav("/login"); }}>
              Chiqish
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => nav("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
