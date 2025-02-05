import { fetchOrderStatusSummary } from "@/app/lib/data";
import AssignmentIcon from "@mui/icons-material/Assignment"; // Icon for status
import {
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export default async function OrderStatusList() {
  const statuses = await fetchOrderStatusSummary(); // Fetch order status summary

  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Order Status Summary
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {statuses.map((statusItem) => (
            <ListItem key={statusItem.status}>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon /> {/* Icon representing order status */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={statusItem.status.toUpperCase()} // Capitalized status
                secondary={`Total Orders: ${statusItem.count}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
