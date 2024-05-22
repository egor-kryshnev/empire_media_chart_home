import useCustomStyles from "../../hooks/useCustomStyles";
import {
    Button,
    buttonClasses
} from "@mui/material";
import { styled } from "@mui/system";

export const useStyles = (theme) => useCustomStyles(theme.chart, theme);