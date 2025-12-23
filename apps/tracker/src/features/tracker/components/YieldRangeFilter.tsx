import { type MouseEvent, useState, useEffect } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDebouncedCallback } from 'use-debounce';

import { rangeInputDebounce } from '@shared/constants/common';

interface YieldRangeFilterProps {
  defaultRangeGap: [number, number];
  range: [number, number];
  onChange: (newRange: [number, number]) => void;
}

const YieldRangeFilter = ({ defaultRangeGap, range, onChange }: YieldRangeFilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localRange, setLocalRange] = useState<[number, number]>(range);

  const open = Boolean(anchorEl);

  useEffect(() => {
    setLocalRange(range);
  }, [range]);

  const debouncedChange = useDebouncedCallback((newRange: [number, number]) => {
    onChange(newRange);
  }, rangeInputDebounce);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMinChange = (value: number) => {
    const newRange: [number, number] = [Math.min(value, localRange[1]), localRange[1]];
    setLocalRange(newRange);
    debouncedChange(newRange);
  };

  const handleMaxChange = (value: number) => {
    const newRange: [number, number] = [localRange[0], Math.max(value, localRange[0])];
    setLocalRange(newRange);
    debouncedChange(newRange);
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const newRange: [number, number] = [newValue[0], newValue[1]];
      setLocalRange(newRange);
      debouncedChange(newRange);
    }
  };

  const handleReset = () => {
    setLocalRange(defaultRangeGap);
    onChange(defaultRangeGap);
  };

  const isDefault = range[0] === defaultRangeGap[0] && range[1] === defaultRangeGap[1];
  const label = isDefault ? 'Yield Range: Any APY' : `Yield Range: ${range[0]}% - ${range[1]}%`;

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ height: 36 }}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
      >
        {label}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: { width: 300, mt: 1, p: 2 },
          },
        }}
      >
        <Stack direction="column" spacing={4} alignItems="center">
          <Typography variant="textL">Set APY Range</Typography>

          <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
            <TextField
              label="Min"
              type="number"
              value={localRange[0]}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              size="small"
              variant="outlined"
              fullWidth
              slotProps={{
                htmlInput: {
                  min: defaultRangeGap[0],
                  max: localRange[1],
                  step: 0.1,
                },
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                },
              }}
            />
            <TextField
              label="Max"
              type="number"
              value={localRange[1]}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              size="small"
              variant="outlined"
              fullWidth
              slotProps={{
                htmlInput: {
                  min: localRange[0],
                  max: defaultRangeGap[1],
                  step: 0.1,
                },
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                },
              }}
            />
          </Stack>

          <Slider
            value={localRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            size="small"
            min={defaultRangeGap[0]}
            max={defaultRangeGap[1]}
            step={0.1}
            sx={(theme) => ({ height: 5, width: `calc(100% - ${theme.spacing(1)})` })}
          />
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default YieldRangeFilter;
