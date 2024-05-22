import useCustomStyles from "../../hooks/useCustomStyles";
import {
    Button,
    buttonClasses
} from "@mui/material";
import { styled } from "@mui/system";

export const useStyles = (theme) => useCustomStyles(theme.chart, theme);

export const ButtonWrapper = styled(Button)(({ theme }) => ({
    [`&.${buttonClasses.root}`]: {
        backgroundColor: "transparent",
        color: "black",
        borderColor: "black",
        border: "none",
        boxShadow: "none",
        ["&:hover"]: {
            cursor: "pointer",
            backgroundColor: "#afacb5",
        },
        ["&:disabled"]: {
            border: "0",
            borderBottom: "2px solid black",
        },
    }
}))