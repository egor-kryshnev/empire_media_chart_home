import { useMemo } from 'react';
import { CardContentWrapper, CardWrapper } from './Header.styles';
import { Typography } from '@mui/material';

const Header = ({ previousStock, lastStock }) => {
    const percenteDifference = useMemo(() => {
        const diff = ((Number(lastStock?.Open) / Number(previousStock?.Open)) * 100) - 100
        return diff.toFixed(2)
    }, [lastStock, previousStock]);
    const difference = useMemo(() => ((lastStock?.Open - previousStock?.Open).toFixed(2)).toString(), [lastStock, previousStock]);
    const isGrow = useMemo(() => (difference > 0 && percenteDifference > 0), [difference, percenteDifference])


    return (
        <CardWrapper sx={{ minHeight: 152, minWidth: "95%" }}>
            <CardContentWrapper>
                <div>
                    <Typography variant="h4" component="div">
                        Apple Inc
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        As of: {lastStock?.Date}
                    </Typography>
                </div>
            </CardContentWrapper>

            <CardContentWrapper sx={{ dir: "rtl" }}>
                <div className="">
                    <Typography variant="h3" component="div" dir='rtl'>
                        {lastStock?.Open ?? ""}
                    </Typography>
                    <Typography variant="h5" component="div" dir='rtl' color={isGrow ? "green" : "red"}>
                        {isGrow > 0 ? `${difference}+ ${percenteDifference}%+ \u25B2` : `${difference * -1}- ${percenteDifference * -1}%- \u25BC`}
                    </Typography>
                </div>
            </CardContentWrapper>
        </CardWrapper>
    );
};

export default Header;
