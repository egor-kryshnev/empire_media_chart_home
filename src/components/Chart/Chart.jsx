import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import { format } from "date-fns";
import IntervalButtons from '../IntervalButtons/IntervalButtons';


const Chart = ({ stocks, currentInterval }) => {

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
      <IntervalButtons currentInterval={currentInterval}/>
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