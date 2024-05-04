import { createTheme } from "@mui/material";

export const theme = createTheme({
    home: {
        wrapper: {
            display: "grid",
            gridTemplateColumns: "95%",
            height: "100%",
            justifyItems: "center"
        }
    },
    header: {
        wrapper: {

        }
    },
    chart: {
        wrapper: {
            display: "grid",
            gridTemplateColumns: "50% 50%",
            height: "100%"
        },
        buttonWrapper: {
            display: "grid",
            gridTemplateColumns: "auto",
            rowGap: "1em"
        }
    }
});