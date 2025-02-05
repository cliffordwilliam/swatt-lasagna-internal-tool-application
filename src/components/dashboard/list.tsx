import { fetchTopSellingItems } from "@/app/lib/data";
import { convertToRp } from "@/app/lib/utils"; // Import the convertToRp function
import { Card, CardContent, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

export default async function FolderList() {
  const items = await fetchTopSellingItems(); // Fetch top selling items

  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Product tree
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar>
                  {/* Use first letter of item name as avatar */}
                  {item.name ? item.name[0] : "N"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name || "Unknown Item"}
                secondary={`Total Sold: ${
                  item.totalSold || 0
                } | Price: ${convertToRp(item.price || 0)}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
