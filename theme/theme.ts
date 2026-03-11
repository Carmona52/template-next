'use client'
import {createTheme} from "@mui/system";

export const theme = createTheme({
    palette: {},
    typography: {},
    components:{
        MuiButton:{
            root:{
                backgroundColor:'black',
                color:'white',
            }
        },
        MuiTypography:{
            root:{
                color:'white',
                fontSize:'14px',
            }
        }
    }
})