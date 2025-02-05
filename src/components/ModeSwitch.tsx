"use client";
import AutoModeIcon from "@mui/icons-material/AutoMode"; // New icon for system mode
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  // Function to toggle between light, dark, and system modes
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else if (mode === "dark") {
      setMode("system");
    } else {
      setMode("light");
    }
  };

  // Determine which icon to display based on the current mode
  const getIcon = () => {
    if (mode === "system") {
      return <AutoModeIcon />;
    }
    return mode === "light" ? <DarkModeIcon /> : <LightModeIcon />;
  };

  return (
    <IconButton size="large" edge="end" onClick={toggleMode} color="inherit">
      {getIcon()}
    </IconButton>
  );
}
