import { useStyles, ButtonWrapper } from './Chart.styles';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme, Box, ButtonGroup } from '@mui/material';
import { format } from "date-fns";
import { useDispatch } from 'react-redux';
import { setTimeInterval } from '../../store/actions/stocksActions/stocksActions';
import { getStocksActionCreator } from '../../store/actions/stocksActions/stocksActionCreator';


const Chart = ({ stocks, currentInterval }) => {
  const dispatch = useDispatch();
  const classes = useStyles(useTheme());

  const checkDisabledButton = (btn) => `${currentInterval.value}${currentInterval.precision}` === btn

  const handleButtonChangeInterval = (value, precision) => {
    dispatch(setTimeInterval({
      value: value,
      precision: precision
    }));
    const load = async () => {
      await dispatch(getStocksActionCreator());
    };
    load();
  };

  const CustomizedAxisTick = ({ x, y, payload }) => {
    const dateTip = format(new Date(payload.value), 'd MMM');
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={23} y={0} dy={14} fontSize="0.90em" fontFamily="bold" textAnchor="end" fill="#363636">
          {dateTip}</text>
      </g>
    );
  }

  return (
    <Box sx={{ minWidth: "95%", width: "20rem" }}>
      <div className={classes?.buttonWrapper}>
        <ButtonGroup disavariant="contained" sx={{ boxShadow: "none" }} aria-label="outlined primary button group">
          <ButtonWrapper disabled sx={{
            borderBottom: "2px solid black"
          }}>Overview</ButtonWrapper>
          <ButtonWrapper disabled sx={{
            borderBottom: "2px solid black"
          }}>History</ButtonWrapper>
        </ButtonGroup>
        <ButtonGroup variant="contained" sx={{ boxShadow: "none" }} aria-label="outlined primary button group">
          <ButtonWrapper disabled={checkDisabledButton("1minute")} onClick={() => handleButtonChangeInterval(1, "minute")} sx={{
            borderBottom: "2px solid black"
          }}>1 Minute</ButtonWrapper>
          <ButtonWrapper disabled={checkDisabledButton("5minute")} onClick={() => handleButtonChangeInterval(5, "minute")} sx={{
            borderBottom: "2px solid black"
          }}>5 Minutes</ButtonWrapper>
          <ButtonWrapper disabled={checkDisabledButton("1hour")} onClick={() => handleButtonChangeInterval(1, "hour")} sx={{
            borderBottom: "2px solid black"
          }}>1 Hour</ButtonWrapper>
          <ButtonWrapper disabled={checkDisabledButton("1week")} onClick={() => handleButtonChangeInterval(1, "week")} sx={{
            borderBottom: "2px solid black"
          }}>1 Week</ButtonWrapper>
        </ButtonGroup>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={stocks}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type='category' dataKey="Date" tick={CustomizedAxisTick} allowDuplicatedCategory={false} />
          <XAxis type='category' dataKey="StartDate" tick={CustomizedAxisTick} allowDuplicatedCategory={false} />
          <YAxis orientation='right' type='number' dataKey="Open" domain={['Low', 'High']} tickFormatter={(value) => value.toFixed(2)} allowDecimals={true} />
          <Tooltip />
          <Area type="monotone" dataKey="Open" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;