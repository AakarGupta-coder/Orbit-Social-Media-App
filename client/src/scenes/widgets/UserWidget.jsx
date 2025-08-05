import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Close as CloseIcon
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton, TextField, Button, Popover } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [socials, setSocials] = useState({ twitter: "", linkedin: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    setSocials({
      twitter: data.twitter || "",
      linkedin: data.linkedin || "",
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, occupation, friends } = user;

  const events = [
    { title: "SPHEREx & PUNCH Launch", date: "Feb 14, 2025", time: "Time TBA", details: "NASA's SPHEREx and PUNCH missions will launch to explore the cosmos and the Sun's outer atmosphere." },
    { title: "NISAR Mission Launch", date: "March 2025", time: "Time TBA", details: "A joint mission between NASA and ISRO to study Earth's changing ecosystems, ice mass, and natural hazards." },
    { title: "Crew-10 Mission", date: "March 12, 2025", time: "Time TBA", details: "A SpaceX Crew Dragon mission to the International Space Station with four astronauts on board." },
    { title: "IMAP Mission Launch", date: "April 2025", time: "Time TBA", details: "NASA's Interstellar Mapping and Acceleration Probe will study the boundary of our heliosphere." },
    { title: "Axiom Mission 4", date: "May 2025", time: "Time TBA", details: "A private mission to the ISS, marking another step toward commercial space travel." },
    { title: "TSIS-2 Launch", date: "May 2025", time: "Time TBA", details: "NASA's Total and Spectral Solar Irradiance Sensor-2 will monitor solar energy affecting Earth's climate." },
    { title: "Artemis II Mission", date: "Late 2025", time: "Time TBA", details: "NASA's first crewed Artemis mission, taking astronauts around the Moon and back." },
    { title: "Partial Solar Eclipse", date: "March 29, 2025", time: "4:45 PM IST", details: "A partial solar eclipse visible from parts of the world, offering a spectacular celestial event." }
  ];

  const handleEventClick = (event, eventTarget) => {
    setSelectedEvent(event);
    setAnchorEl(eventTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  return (
      <>
        <WidgetWrapper>
          <FlexBetween gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
            <FlexBetween gap="1rem">
              <UserImage image={picturePath} />
              <Box>
                <Typography variant="h4" color={dark} fontWeight="500" sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer" }}}>
                  {firstName} {lastName}
                </Typography>
                <Typography color={medium}>{friends.length} friends</Typography>
              </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
          </FlexBetween>

          <Divider />

          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{occupation}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box p="1rem 0">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
              Social Profiles
            </Typography>

            {editing ? (
                <>
                  <TextField fullWidth name="twitter" label="Twitter URL" value={socials.twitter} onChange={(e) => setSocials({ ...socials, twitter: e.target.value })} sx={{ mb: 1 }} />
                  <TextField fullWidth name="linkedin" label="LinkedIn URL" value={socials.linkedin} onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })} sx={{ mb: 1 }} />
                  <Button variant="contained" color="primary" onClick={() => setEditing(false)}>Save</Button>
                </>
            ) : (
                <>
                  {[
                    { platform: "twitter", label: "Twitter", subtitle: "Social Network" },
                    { platform: "linkedin", label: "LinkedIn", subtitle: "Corporate Network" }
                  ].map(({ platform, label, subtitle }) => (
                      <FlexBetween key={platform} gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                          <img src={`../assets/${platform}.png`} alt={platform} width={24} height={24} />
                          <Box>
                            <Typography color={main} fontWeight="500">
                              <a href={socials[platform] || `https://${platform}.com`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: main }}>
                                {label}
                              </a>
                            </Typography>
                            <Typography color={medium} fontSize="0.8rem">{subtitle}</Typography>
                          </Box>
                        </FlexBetween>
                        <IconButton onClick={() => setEditing(true)} sx={{ color: main }}>
                          <EditOutlined />
                        </IconButton>
                      </FlexBetween>
                  ))}
                </>
            )}
          </Box>
        </WidgetWrapper>

        <Box height="2rem" />

        <WidgetWrapper>
          <Typography fontSize="1.2rem" color={main} fontWeight="600" mb="1rem">Upcoming Major Space Events</Typography>
          <Box p="1rem 0">
            {events.map((event, index) => (
                <Box key={index}>
                  <FlexBetween>
                    <Typography color={medium} fontWeight="500">🚀 {event.title} - {event.date} | {event.time}</Typography>
                    <Button variant="outlined" color="primary" onClick={(e) => handleEventClick(event, e.currentTarget)}>Details</Button>
                  </FlexBetween>
                  {index < events.length - 1 && <Divider sx={{ my: 1 }} />}
                </Box>
            ))}
          </Box>
        </WidgetWrapper>

        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Box p={2} maxWidth={300} position="relative">
            <IconButton size="small" sx={{ position: "absolute", top: 4, right: 4 }} onClick={handleClosePopover}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">{selectedEvent?.title}</Typography>
            <Typography fontSize="0.9rem" color={medium}>{selectedEvent?.date} | {selectedEvent?.time}</Typography>
            <Typography mt={1}>{selectedEvent?.details}</Typography>
            <Button onClick={() => alert("Event added to calendar!")} variant="contained" color="primary" size="small" sx={{ mt: 2 }}>Add to Calendar</Button>
          </Box>
        </Popover>
      </>
  );
};

export default UserWidget;
