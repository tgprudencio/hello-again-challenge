import React from "react";
import { 
    View,
    Text 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AvailableRewardsScreen: React.FC = () => {
    return (
        <SafeAreaView style = {{ flex: 1 }}>
            <Text>Available Rewards</Text>
        </SafeAreaView>
    )
}

export default AvailableRewardsScreen;