import { useStyles } from './Home.styles';
import { useTheme, ButtonGroup } from '@mui/material';
import { ButtonWrapper } from '../Chart/Chart.styles';
import { useSelector } from 'react-redux';
import { getStocks, getInterval } from '../../store/selectors/stocksSelector';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';
import CustomTable from '../Table/Table';
import { useLocation, useNavigate } from 'react-router-dom'
import { RouteNames } from '../../App';

const Home = () => {
    const classes = useStyles(useTheme());
    const stocks = useSelector(getStocks);
    const interval = useSelector(getInterval);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={classes?.wrapper}>
            <Header previousStock={stocks?.slice(-2)?.[0]} lastStock={stocks?.slice(-1)?.[0]} />
            <ButtonGroup disavariant="contained" sx={{ boxShadow: "none" }} aria-label="outlined primary button group">
                <ButtonWrapper disabled={location.pathname === RouteNames.Home} onClick={() => navigate(RouteNames.Home)} sx={{
                    borderBottom: "2px solid black"
                }}>Overview</ButtonWrapper>
                <ButtonWrapper disabled={location.pathname === RouteNames.History} onClick={() => navigate(RouteNames.History)} sx={{
                    borderBottom: "2px solid black"
                }}>History</ButtonWrapper>
            </ButtonGroup>
            {location.pathname === RouteNames.Home &&  <Chart stocks={stocks} currentInterval={interval} />}
            {location.pathname === RouteNames.History && <CustomTable stocks={stocks} currentInterval={interval} />}
        </div>
    );
};

export default Home;