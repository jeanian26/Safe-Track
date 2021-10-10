// import config setting
import config from '../config';

// Color Themes
const themes = {
  food: {
    // primary color
    primaryLightColor: '#bc00218c',
    primaryColor: '#3FB39E', //00b970//bc0021
    primaryColorDark: '#00945a',
    primaryColorLight: '#00e78c',
    onPrimaryColor: '#ffffff', //
    customonOnPrimaryColor: '#bc0021',

    //dark background
    //darkBackgroundColor:'#bc0021',
    //darkScreenPrimaryText:'#ffffff',
    //darkScreensecondaryText:'#ffffff',

    // accent color, triad
    accentColor: '#0069b9',
    onAccentColor: '#fff',

    // secondary color, primary color split
    secondaryColor: '#b90039',
    onSecondaryColor: '#fff',

    // tertiary color, secondary color intermediately related
    tertiaryColor: '#ffa400',
    onTertiaryColor: '#fff',

    // status bar color
    statusBarColor: '#bc0021', //#fff

    // gradient colors
    primaryGradientColor: '#3FB39E',
    secondaryGradientColor: '#3FB39E',

    // overlay color
    overlayColor: '#3FB39E',

    // text color
    primaryText: '#010203', //#010203
    secondaryText: '#5d5d5d',
    disabledText: 'rgba(0, 0, 0, 0.38)',

    // background, surface
    background: '#ffffff',
    onBackground: '#212121',
    surface: '#fff',
    onSurface: '#757575',
    error: '#cd040b',
    onError: '#fff',
    black: '#010203',
    white: '#fff',
  },
};

const theme = themes[config.theme];

export default theme;
