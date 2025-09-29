import React from "react";
import { 
    View,
    Text 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CollectedRewardsScreen: React.FC = () => {
    return (
        <SafeAreaView style = {{ flex: 1 }}>
            <Text>Collected Rewards</Text>
        </SafeAreaView>
    )
}

export default CollectedRewardsScreen;