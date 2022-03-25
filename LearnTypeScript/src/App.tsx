// import React from "react";
// import {Text} from 'react-native';
// import Profile from "./Profile";

// function App() {
//   return (
//     <Profile name="John Doe">
//       <Text>Hello World</Text>
//     </Profile>
//   );
// }

// export default App;

import qs from 'qs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './screens/RootStack';

function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;