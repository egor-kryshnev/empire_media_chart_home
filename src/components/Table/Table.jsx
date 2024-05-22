import React, { useMemo, useState } from 'react';
import { Box, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, TableSortLabel, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import IntervalButtons from '../IntervalButtons/IntervalButtons';

const tableColumns = {
    Date: (sortingStocks, order) => {
        return sortingStocks.sort((a, b) => {
            return order === "asc" ? new Date(a.Date) - new Date(b.Date) : new Date(b.Date) - new Date(a.Date);
        })
    },
    High: (sortingStocks, order) => {
        return sortingStocks.sort((a, b) => {
            return order === "asc" ? a.High - b.High : b.High - a.High
        })
    },
    Open: (sortingStocks, order) => {
        return sortingStocks.sort((a, b) => {
            return order === "asc" ? a.Open - b.Open : b.Open - a.Open
        })
    },
    Close: (sortingStocks, order) => {
        return sortingStocks.sort((a, b) => {
            return order === "asc" ? a.Close - b.Close : b.Close - a.Close
        })
    },
    Change: (sortingStocks, order) => {
        return sortingStocks.sort((a, b) => {
            const aChange = (((Number(a.Close) / Number(a.Open)) * 100) - 100).toFixed(2);
            const bChange = (((Number(b.Close) / Number(b.Open)) * 100) - 100).toFixed(2);
            return order === "asc" ? aChange - bChange : bChange - aChange;
        })
    },
}

const CustomTable = ({ stocks, currentInterval }) => {
    const [isSortBy, setIsSortBy] = useState("Date");
    const [order, setOrder] = useState("asc");

    const sortedRows = useMemo(() => {
        const spreadedStocks = [...(stocks ?? [])];
        if (spreadedStocks?.length) {
            return tableColumns[isSortBy](spreadedStocks, order);
        }
        return spreadedStocks;
    }, [stocks, isSortBy, order]);

    const sortHandler = (cell) => {
        if(cell === isSortBy) {
            order === "asc" ? setOrder("desc") : setOrder("asc")
            return;
        }
        setIsSortBy(cell);
        setOrder("asc")
    }
  

    return (
        <Box sx={{ minWidth: "95%", width: "20rem" }}>
            <IntervalButtons currentInterval={currentInterval}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "650px", width: "95%" }}>
                    <TableHead>
                        <TableRow>
                            {Object.keys(tableColumns).map((column) => {
                                return (
                                    <TableCell key={column}>
                                        <TableSortLabel
                                            active={isSortBy === column}
                                            direction={order}
                                            onClick={() => { sortHandler(column) }}
                                        >
                                            {column}
                                            {isSortBy === column ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows?.map((stock) => (
                            <TableRow key={stock.Date}>
                                <TableCell>{stock.Date}</TableCell>
                                <TableCell>{stock.High}</TableCell>
                                <TableCell>{stock.Open}</TableCell>
                                <TableCell>{stock.Close}</TableCell>
                                <TableCell>
                                    {(() => {
                                        const change = (((Number(stock.Close) / Number(stock.Open)) * 100) - 100).toFixed(2);
                                        return (
                                            <Typography variant="h6" component="div" dir='ltr' color={change > 0 ? "green" : "red"}>
                                                {change}%
                                            </Typography>
                                        );
                                    })()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CustomTable;