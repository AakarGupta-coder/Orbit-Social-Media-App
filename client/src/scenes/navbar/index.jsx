import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Popover,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEl, setNotificationsEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.paper;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleAboutClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationsEl(null);
  };

  const handleForumClick = () => {
    navigate("/forum");
  };

  const handleMessageClick = () => {
    window.open("/messages", "_blank");
  };

  return (
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="primary"
              onClick={() => navigate("/home")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
          >
            ORBIT 💫
          </Typography>
          {isNonMobileScreens && (
              <FlexBetween
                  backgroundColor={neutralLight}
                  borderRadius="9px"
                  gap="3rem"
                  padding="0.1rem 1.5rem"
              >
                <InputBase placeholder="Search..." sx={{ width: "300px" }} />
                <Tooltip title="Search">
                  <IconButton>
                    <Search />
                  </IconButton>
                </Tooltip>
              </FlexBetween>
          )}
        </FlexBetween>

        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
              <Tooltip title="Toggle Theme">
                <IconButton onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === "dark" ? (
                      <DarkMode sx={{ fontSize: "25px" }} />
                  ) : (
                      <LightMode sx={{ color: dark, fontSize: "25px" }} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Messages">
                <IconButton onClick={handleMessageClick}>
                  <Message sx={{ fontSize: "25px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Discussion Forum">
                <IconButton
                    onClick={handleForumClick}
                    sx={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      }
                    }}
                >
                  <Typography
                      variant="h5"
                      sx={{
                        fontSize: "25px",
                        fontWeight: "bold"
                      }}
                  >
                    #
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton onClick={handleNotificationsClick}>
                  <Notifications sx={{ fontSize: "25px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="About">
                <IconButton onClick={handleAboutClick}>
                  <Help sx={{ fontSize: "25px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="User Profile">
                <FormControl variant="standard" value={fullName}>
                  <Select
                      value={fullName}
                      sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                          pr: "0.25rem",
                          width: "3rem",
                        },
                        "& .MuiSelect-select:focus": {
                          backgroundColor: neutralLight,
                        },
                      }}
                      input={<InputBase />}
                  >
                    <MenuItem value={fullName}>
                      <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>
            </FlexBetween>
        ) : (
            <Tooltip title="Menu">
              <IconButton
                  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Menu />
              </IconButton>
            </Tooltip>
        )}

        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
              <Box display="flex" justifyContent="flex-end" p="1rem">
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>

              <FlexBetween
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="3rem"
              >
                <InputBase placeholder="Search..." />
                <IconButton onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === "dark" ? (
                      <DarkMode sx={{ fontSize: "25px" }} />
                  ) : (
                      <LightMode sx={{ color: dark, fontSize: "25px" }} />
                  )}
                  <Typography sx={{ ml: 1 }}>Toggle Theme</Typography>
                </IconButton>
                <IconButton onClick={handleMessageClick}>
                  <Message sx={{ fontSize: "25px" }} />
                  <Typography sx={{ ml: 1 }}>Messages</Typography>
                </IconButton>
                <IconButton onClick={handleForumClick}>
                  <Typography
                      variant="h5"
                      sx={{
                        fontSize: "25px",
                        fontWeight: "bold"
                      }}
                  >
                    #
                  </Typography>
                  <Typography sx={{ ml: 1 }}>Forum</Typography>
                </IconButton>
                <IconButton onClick={handleNotificationsClick}>
                  <Notifications sx={{ fontSize: "25px" }} />
                  <Typography sx={{ ml: 1 }}>Notifications</Typography>
                </IconButton>
                <IconButton onClick={handleAboutClick}>
                  <Help sx={{ fontSize: "25px" }} />
                  <Typography sx={{ ml: 1 }}>About</Typography>
                </IconButton>
                <FormControl variant="standard" value={fullName}>
                  <Select
                      value={fullName}
                      sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                          pr: "0.25rem",
                          width: "3rem",
                        },
                        "& .MuiSelect-select:focus": {
                          backgroundColor: neutralLight,
                        },
                      }}
                      input={<InputBase />}
                  >
                    <MenuItem value={fullName}>
                      <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>
                      Log Out
                    </MenuItem>
                  </Select>
                </FormControl>
              </FlexBetween>
            </Box>
        )}

        <Popover
            open={Boolean(notificationsEl)}
            anchorEl={notificationsEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Box
              bgcolor={background}
              p={2}
              borderRadius="10px"
              boxShadow={3}
              maxWidth="300px"
              color={theme.palette.text.primary}
              position="relative"
              sx={{
                maxHeight: "250px",
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-thumb": { background: primaryLight, borderRadius: "10px" }
              }}
          >
            <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 5, right: 5, color: theme.palette.text.primary }}
            >
              <Close />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Upcoming Space Conferences 🚀
            </Typography>
            {[
              { title: "🛰️ Satellite Tech Conference", date: "January 18, 2026", time: "9:00 AM - 5:00 PM" },
              { title: "🌍 Space Tech Expo", date: "March 15, 2025", time: "10:00 AM - 5:00 PM" },
              { title: "🚀 International Astronautical Congress", date: "April 10, 2025", time: "9:00 AM - 6:00 PM" },
              { title: "🔭 Space Innovations Forum", date: "May 22, 2025", time: "10:30 AM - 4:30 PM" },
              { title: "🌌 NASA Innovation Summit", date: "August 20, 2025", time: "8:30 AM - 3:00 PM" },
              { title: "🚀 Mars Colonization Summit", date: "October 25, 2025", time: "9:30 AM - 4:30 PM" },
            ].map((event, index) => (
                <Box key={index} mt={1} pb={1} borderBottom={`1px solid ${theme.palette.divider}`}>
                  <Typography sx={{ cursor: "pointer", "&:hover": { color: primaryLight } }}>{event.title}</Typography>
                  <Typography variant="body2" color={theme.palette.text.secondary}>{event.date}</Typography>
                  <Typography variant="body2" color={theme.palette.text.secondary}>{event.time}</Typography>
                </Box>
            ))}
          </Box>
        </Popover>

        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Box
              bgcolor={background}
              p={2}
              borderRadius="10px"
              boxShadow={3}
              maxWidth="400px"
              color={theme.palette.text.primary}
              position="relative"
              sx={{
                maxHeight: "300px",
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-thumb": { background: primaryLight, borderRadius: "10px" },
              }}
          >
            <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 5, right: 5, color: theme.palette.text.primary }}
            >
              <Close />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              About ORBIT 💫
            </Typography>
            <Typography variant="body1" paragraph>
              ORBIT is a cutting-edge social platform for space enthusiasts, researchers, and professionals to connect, collaborate, and share their passion for the cosmos.
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to foster a global community dedicated to advancing space exploration and scientific discovery.
            </Typography>
            <Typography variant="body1">
              Key Features:
            </Typography>
            <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
              <li>Connect with fellow space enthusiasts</li>
              <li>Share and discuss latest space news</li>
              <li>Collaborate on space-related projects</li>
              <li>Access exclusive space event information</li>
              <li>Engage in educational content about space</li>
            </ul>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Developed by:
            </Typography>
            <Typography variant="body1">
              Aakar Gupta - 24BRS1321
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Join us in our journey to explore the final frontier! 🚀🌠
            </Typography>
          </Box>
        </Popover>
      </FlexBetween>
  );
};

export default Navbar;
