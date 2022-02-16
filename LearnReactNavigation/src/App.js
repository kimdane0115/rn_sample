import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import {View, Text, TouchableOpacity} from 'react-native';
import HeaderlessScreen from './screens/HeaderlessScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        //Stack Navigator가 관리하는 모든 화면에서 헤더를 업애고 싶을때
        //screenOptions={{headerShown: false,}}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈123',
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
       />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          // options={({route}) => ({
          //   title: `상세 정보 F - ${route.params.id}`,
          // })}
          options={{
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Text>Left</Text>
              </TouchableOpacity>
            ),
            headerTitle: ({children}) => (
              <View>
                <Text>{children}</Text>
              </View>
            ),
            headerRight: () => (
              <View>
                <Text>Right</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Headerless"
          component={HeaderlessScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;