const defaultNavigatorOptions = {
  defaultNavigationOptions: {
    /* handles configuration options for all screens; values can be overwritten by adding the same property to the navigation options of each screen */
    headerStyle: {
      backgroundColor: 'hotpink', // background color
    },
    headerTintColor: 'yellow', // font color default for the whole header
    headerTitleStyle: {
      fontWeight: 'normal',
      /* color changes only the color of the title */
      color: 'white',
    },
    headerBackTitleStyle: {
      /* styles the back button title */
      color: 'greenyellow',
    },
    /* gesturesEnabled enables swiping between screens, defaults to true for iOS and to false on Android */
    gesturesEnabled: true,
  },
};

export default defaultNavigatorOptions;
