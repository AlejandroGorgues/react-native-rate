import { Platform } from "react-native";
const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      primaryError: '#d22e2e',
      languageTextPrimary:'#ffffff',
      mainBackgroundColor: '#e1e4e8',
      itemBackgroundColor: '#ffffff',
      formError: '#d73a4a'
    },
    tabColors: {
      textPrimary:'#ffffff',
      backgroundColor:'#24292e',

    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    }
  };
  
  export default theme;