import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AvailableRewardsScreen from "../screens/AvailableRewards";
import CollectedRewardsScreen from "../screens/CollectedRewards";

export type RootStackParamList = {
    AvailableRewards: undefined;
    CollectedRewards: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AvailableRewards">
                <Stack.Screen
                    name="AvailableRewards"
                    component={AvailableRewardsScreen}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="CollectedRewards"
                    component={CollectedRewardsScreen}
                    options={{ title: 'Collected Rewards' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;