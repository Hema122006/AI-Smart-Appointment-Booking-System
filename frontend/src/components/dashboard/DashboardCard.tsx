import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  value: string | number;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  color,
}: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        transition:"all .3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          color={color}
        >
          {title}
        </Typography>

        <Typography
            variant="h4"
            sx={{
                fontWeight: "bold",
            }}
        >
            {value}
        </Typography>
      </CardContent>
    </Card>
  );
}