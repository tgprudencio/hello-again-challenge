export interface Reward {
    id: number;
    name: string;
    needed_points: number;
    pictures?: { image: string } [];
}

export interface RewardsState {
    availableRewards: Reward[];
    collectedRewards: Reward[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
}