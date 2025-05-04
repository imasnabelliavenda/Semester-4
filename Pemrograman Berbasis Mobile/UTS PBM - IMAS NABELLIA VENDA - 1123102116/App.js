import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from './pages/ExploreScreen';
import FavoriteScreen from './pages/FavoriteScreen';
import DetailScreen from './pages/DetailScreen';
import TrendingScreen from './pages/TrendingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoriteProvider } from './components/Favorite'; // pastikan path-nya sesuai

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Explore') iconName = 'search';
          else if (route.name === 'Favorites') iconName = 'heart';
          else if (route.name === 'Trending') iconName = 'fire';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Trending" component={TrendingScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Favorites" component={FavoriteScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>

  );
}

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: 'Detail Film' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
}
