import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#9A0036',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});
export default theme;