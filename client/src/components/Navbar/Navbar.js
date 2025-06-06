import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as actionType from '../../constants/actionTypes';
import memories from "../../images/memories.png";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        localStorage.removeItem("profile");
        setUser(null);
        navigate("/auth");
    };

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem("profile"));
        if (storedProfile?.token) {
            const decodedToken = jwtDecode(storedProfile.token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout(); // Auto logout
            } else {
                setUser(storedProfile); // Still valid
            }
        } else {
            setUser(null);
        }
    }, [location]);

    return (
        <AppBar
            position="static"
            sx={{
                borderRadius: 2,
                margin: "30px 0",
                padding: "10px 50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            color="inherit"
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    component={Link}
                    to="/"
                    variant="h2"
                    align="center"
                    sx={{
                        color: "rgba(0,183,255, 1)",
                        textDecoration: "none",
                    }}
                >
                    Memories
                </Typography>
                <img src={memories} alt="icon" height="60" style={{ marginLeft: "15px" }} />
            </Box>

            <Toolbar sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}>
                {user?.result ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Avatar
                            alt={user.result.name}
                            src={user.result.picture}
                            sx={{
                                bgcolor: "purple",
                                color: "white",
                                width: 40,
                                height: 40,
                                fontSize: "1.1rem",
                            }}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
                                color: "#333",
                                letterSpacing: "0.5px",
                            }}
                        >
                            {user.result.name}
                        </Typography>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={logout}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "0.95rem",
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
