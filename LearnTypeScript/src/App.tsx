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

// import qs from 'qs';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import RootStack from './screens/RootStack';

// function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }

// export default App;


/// < 13 > ///
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './slices';
//import AuthApp from './components/AuthApp';
import TodoApp from './components/TodoApp';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      {/* <AuthApp /> */}
      <TodoApp />
    </Provider>
  );
}

export default App;