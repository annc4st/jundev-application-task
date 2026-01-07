import { Box, AppBar, Toolbar, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = ["Tasks", "Create New"];

export const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigate = (page: string) => () => {
        const path = page === "Tasks" ? "/tasks" : "/tasks/create";

        navigate(path);
    };

    return (
        <AppBar position="relative" sx={{ mb: 4 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleNavigate(page)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
