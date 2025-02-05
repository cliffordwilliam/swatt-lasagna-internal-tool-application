import { fetchTotalOrders, fetchTotalRevenue } from "@/app/lib/data";
import { convertToRp } from "@/app/lib/utils";
import { Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default async function CardWrapper() {
  const data = await Promise.all([fetchTotalRevenue(), fetchTotalOrders()]);

  const cardData = [
    { title: "Total Revenue", value: convertToRp(data[0]) },
    { title: "Total Orders", value: data[1] },
  ];

  return (
    <>
      {cardData.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 6 }}>
          <BasicCard {...card} />
        </Grid>
      ))}
    </>
  );
}

// todo: update the hardcoded values
export function BasicCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="h4" component="p">
              {value}
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Since Inception
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
