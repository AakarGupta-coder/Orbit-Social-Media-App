import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Want an Ad?</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/astroad.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>SEDS Antriksh</Typography>
        <Typography color={medium}>sedsantriksh.vitc.ac.in</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
          Launch your message into the cosmos—where your ads shine brighter than a supernova and light up
          the galaxy!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
