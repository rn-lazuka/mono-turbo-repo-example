import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface CurrentValueTableCellProps {
  value: number;
  earned: number;
}
const CurrentValueTableCell = ({ earned, value }: CurrentValueTableCellProps) => {
  return (
    <Stack direction="column" alignItems="flex-end">
      <Typography variant="textMSB" color="text.black">
        ${value.toFixed(2)}
      </Typography>
      <Typography variant="textMSB" color="text.green">
        <ArrowUpwardRoundedIcon sx={{ fontSize: '12px', mr: 1 }} /> +${earned.toFixed(2)}
      </Typography>
    </Stack>
  );
};

export default CurrentValueTableCell;
