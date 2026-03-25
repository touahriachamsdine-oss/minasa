import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

// Screens (Placeholder imports)
import DashboardScreen from './screens/DashboardScreen';
import ExploreScreen from './screens/ExploreScreen';
import CreateScreen from './screens/CreateScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [loaded] = useFonts({
        'Syne': require('./assets/fonts/Syne-Bold.ttf'), // Assumes assets exist
    });

    // Mock session check
    const session = null;

    if (!session) return <AuthScreen />;

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { backgroundColor: '#04060F', borderTopColor: '#00FFB233' },
                    tabBarActiveTintColor: '#00FFB2',
                }}
            >
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="Explore" component={ExploreScreen} />
                <Tab.Screen name="Create" component={CreateScreen} />
                <Tab.Screen name="Alerts" component={NotificationsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
