import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface FilterChipsListProps {
  title: string;
  data?: string[];
  hideList?: boolean;
}
const FilterChipsList = ({ title, data, hideList = false }: FilterChipsListProps) => {
  if (!data || !data.length || hideList) return null;

  return (
    <Stack direction="column" spacing={0.5}>
      <Typography variant="textS" color="text.secondary">
        {title}:
      </Typography>
      <Box gap={0.5} display="flex" flexWrap="wrap">
        {data.map((item) => (
          <Paper
            square={false}
            key={item}
            sx={{
              background: alpha('#536E87', 0.1),
              px: 1.25,
              py: 0.25,
              borderRadius: '100px',
              border: '1px solid #536E8714',
            }}
          >
            <Typography variant="textSSB">{item}</Typography>
          </Paper>
        ))}
      </Box>
    </Stack>
  );
};

export default FilterChipsList;
