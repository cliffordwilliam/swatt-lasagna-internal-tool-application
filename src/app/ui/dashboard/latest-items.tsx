import { fetchItems } from "@/app/lib/data";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { formatCurrency } from "@/app/lib/utils";

export default async function LatestItems() {
  const latestItems = await fetchItems();

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {latestItems.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
            secondary={`Price: Rp ${formatCurrency(item.price)}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
