import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RewardsState, Reward } from "./types";

export const fetchRewards = createAsyncThunk(
    'rewards/fetchRewards',
    async (page: number, { rejectWithValue }) => {
        try {
            const res = await fetch(`https://staging.helloagain.at/api/v1/clients/5189/bounties/?limit=10&page=${page}`);
            if (!res.ok) throw new Error ('Failed to fetch reward');
            const data = await res.json();

            return {
                rewards: data.results.filter((reward: Reward) => (reward.pictures?.length ?? 0) > 0),
                page,
                hasMore: !!data.next
            };
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
);

const initialState: RewardsState = {
    availableRewards: [],
    collectedRewards: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
}

const rewardsSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {
        collectReward: (state, action: PayloadAction<Reward>) => {
            if (!state.collectedRewards.some((reward) => reward.id === action.payload.id)) {
                state.collectedRewards.push(action.payload)
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRewards.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRewards.fulfilled, (state, action) => {
            state.loading = false;
            const { rewards, page, hasMore } = action.payload;
            const newRewards = rewards.filter(
                (reward: Reward) => !state.availableRewards.some((avReward) => avReward.id === reward.id)
            );
            state.availableRewards.push(...newRewards);
            state.page = page;
            state.hasMore = hasMore;
        })
        .addCase(fetchRewards.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export const { collectReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;