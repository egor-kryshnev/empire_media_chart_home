import {
    Card,
    CardActions,
    CardContent,
    cardClasses,
    cardContentClasses,
    cardActionsClasses
} from "@mui/material";
import { styled } from "@mui/system";
import useCustomStyles from "../../hooks/useCustomStyles";

export const useStyles = (theme) => useCustomStyles(theme.header, theme);

export const CardContentWrapper = styled(CardContent)(({ theme }) => ({
    [`&.${cardContentClasses.root}`]: {
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto",
        padding: "0",
        alignItems: "center"
    },
}));

export const CardActionsWrapper = styled(CardActions)(({ theme }) => ({
    [`&.${cardActionsClasses.root}`]: {
        direction: "rtl",
        alignItems: "end",
    },
}));

export const CardWrapper = styled(Card)(({ theme }) => ({
    [`&.${cardClasses.root}`]: {
        display: "flex",
        flexWrap: "wrap",
        width: "20rem",
        justifyContent: "space-between",
        paddingLeft: "10px",
        paddingRight: "10px"
    }
}))