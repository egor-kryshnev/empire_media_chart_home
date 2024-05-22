import { useStyles, ButtonWrapper } from './IntervalButtons.styles';
import React from 'react';
import { useTheme, ButtonGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setTimeInterval } from '../../store/actions/stocksActions/stocksActions';
import { getStocksActionCreator } from '../../store/actions/stocksActions/stocksActionCreator';


const IntervalButtons = ({ currentInterval }) => {
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

  return (
    <div className={classes?.buttonWrapper}>
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
  );
};

export default IntervalButtons;