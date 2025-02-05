import BasicBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import CardWrapper from "@/components/dashboard/cards";
import FolderList from "@/components/dashboard/list";
import OrderStatusList from "@/components/dashboard/OrderStatusList";
import RevenueChartWrapper from "@/components/dashboard/RevenueChartWrapper";
import BasicTable from "@/components/dashboard/table";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box
      sx={{
        p: 1,
        width: "100%",
      }}
    >
      <BasicBreadcrumbs />
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        <CardWrapper />
        <Grid size={{ xs: 12, md: 12 }}>
          <RevenueChartWrapper />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <BasicTable />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <OrderStatusList />
            <FolderList />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
