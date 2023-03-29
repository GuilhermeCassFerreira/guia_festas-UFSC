import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './home';
import EventsListScreen from './EventsList';
import EventsFavScreen from './EventsFav';
import EventDetailsScreen from './EventsDetails';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  EventsList: {screen: EventsListScreen},
  EventDetails: {screen: EventDetailsScreen},
  EventsFav: {screen: EventsFavScreen}
});
 
const App = createAppContainer(MainNavigator);
export default App;