import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { startDateVar, endDateVar } from 'graphql/Cache';
import Stack from '@mui/material/Stack';
import { useReactiveVar } from '@apollo/client';

export default function BasicDateRangePicker() {
  const s = useReactiveVar(startDateVar);
  const e = useReactiveVar(endDateVar);
  const [value, setValue] = React.useState<DateRange<Date>>([
    new Date(s),
    new Date(e),
  ]);

  // Only update UI date range display - not updating global date range
  const updateDateRange = (dateRange: any) => {
    setValue(dateRange);
  };

  // Updates global date-range store => all reports using global date-range will update
  const applyDateRangeFilter = () => {
    startDateVar(value[0]?.toString());
    endDateVar(value[1]?.toString());
  };

  // checks whether need to enable filter button
  // Only enable (return true) when local state is not the same as reactiveVars
  const checkToDisable = () => {
    return value[0]?.toString() === s && value[1]?.toString() === e;
  };
  const disabled = checkToDisable();

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Start"
            endText="End"
            value={value}
            onChange={(newValue) => {
              updateDateRange(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
      <button
        className={
          !disabled
            ? 'h-12 px-6 text-indigo-100 transition-colors duration-350 bg-green-600 rounded-lg focus:shadow-outline hover:bg-yellow-500'
            : 'h-12 px-6 text-indigo-100 bg-gray-500 rounded-lg focus:shadow-outline'
        }
        onClick={applyDateRangeFilter}
        disabled={disabled}
      >
        Apply filter
      </button>
    </Stack>
  );
}
