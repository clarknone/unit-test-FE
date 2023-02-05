import { Avatar, Box, Card, Stack } from "@mui/material";
import { IconType } from "react-icons";

export interface IStatsCardProps {
  title: string;
  value: number;
  Icon: IconType;
}

export default function StatsCard({ title, value, Icon }: IStatsCardProps) {
  return (
    <Card
      elevation={0}
      key={title}
      sx={{
        maxWidth: { md: "14.03vw" },
        width: "100%",
        minHeight: { xs: "70px", sm: "67px", md: "6.94vw" },
      }}
    >
      <Box px={{ xs: "11px", sm: "17px", md: "1.00vw" }}>
        <Stack
          sx={{
            fontSize: { xs: "0.50em", sm: "0.50em", md: "0.83vw" },
            mt: { xs: "8px", sm: "12px", md: "1.25vw" },
            fontWeight: "500",
          }}
        >
          {title}
        </Stack>
        <Stack flexDirection="row" justifyContent="space-between">
          <Box
            sx={{
              mt: { xs: "6px", sm: "9px", md: "0.97vw" },
              fontSize: { xs: "1.33em", sm: "1.33em", md: "2.22vw" },
            }}
          >
            {value || 0}
          </Box>

          <Avatar
            variant="rounded"
            sx={{
              background: "#2A569F",
              fontSize: { xs: "13px", sm: "20px", md: "2vw" },
              width: { xs: "15px", sm: "24px", md: "2.50vw" },
              height: { xs: "15px", sm: "24px", md: "2.50vw" },
              pt: { xs: "1px", sm: "2px", md: "0.40vw" },
            }}
          >
            <Box fontSize="inherit">
              <Icon />
            </Box>
          </Avatar>
        </Stack>
      </Box>
    </Card>
  );
}
