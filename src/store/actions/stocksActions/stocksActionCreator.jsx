import { setStocks } from "./stocksActions";
import { format } from "date-fns";

export const getStocksActionCreator = () => {
  return async (dispatch, getState) => {
    const state = getState();

    const endTime = new Date();
    const startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)

    const newEndTime = format(endTime, 'MM/dd/y%20HH:mm');
    const newStartTime = format(startTime, 'MM/dd/y%20HH:mm');

    let interval = 60;

    switch (state.stocks.interval.precision) {
      case "hour":
        interval = state.stocks.interval.value * 60;
        break;
      case "minute":
        interval = state.stocks.interval.value;
        break;
      case "week":
        interval = state.stocks.interval.value * 1440 * 7;
        break;
      default:
        interval = state.stocks.interval.value;
        break;
    };

    const url = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&` +
      `period=${interval}&` +
      `Precision=Minutes&` +
      `StartTime=${newStartTime}&` +
      `EndTime=${newEndTime}&` +
      `_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`;
    try {
      const data = await ((await fetch(url)).json());
      dispatch(setStocks(data));
    } catch (e) {
      console.error(`Failed to fetch stocks, error:${e}`)
    }
  };
};

export const initStocksActionCreator = () => {
  return async (dispatch, getState) => {
    const state = getState();

    if (!state.stocks.data) {
      await dispatch(getStocksActionCreator());
    }
  };
};