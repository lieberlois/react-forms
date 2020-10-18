import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff6600"
    },
    secondary: {
      main: "#b02600"
    }
  },
  typography: {
    fontFamily: "Arial",
    body2: {
      fontSize: "1.1rem"
    }
  },
  shape: {
    borderRadius: 10
  },
  spacing: 8,  // Default
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        padding: 10
      }
    }
  },
  props: {
    MuiButton: {
      disableRipple: true,
      variant: "contained",
      color: "primary"
    },
    MuiCheckbox: {
      disableRipple: true
    },
    MuiTextField: {
      variant: "outlined",
      InputLabelProps: {
        shrink: true
      }
    }
  }
});
