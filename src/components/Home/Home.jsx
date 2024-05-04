import { useStyles } from './Home.styles';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { getStocks, getInterval } from '../../store/selectors/stocksSelector';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';

const Home = () => {
    const classes = useStyles(useTheme());
    const stocks = useSelector(getStocks);
    const interval = useSelector(getInterval);

    return (
        <div className={classes?.wrapper}>
            <Header previousStock={stocks?.slice(-2)?.[0]} lastStock={stocks?.slice(-1)?.[0]} />
            <Chart stocks={stocks} currentInterval={interval} />
        </div>
    );
};

export default Home;