import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/UserService';

// Thunk to delete a user
export const deleteUser = createAsyncThunk(
    'leads/deleteUser',
    async (userId) => {
        await userService.deleteUser(userId);
        return userId; // Return the deleted userId
    }
);

export const leadsSlice = createSlice({
    name: 'leads',
    initialState: {
        isLoading: false,
        leads: []
    },
    reducers: {
        addNewLead: (state, action) => {
            let { newLeadObj } = action.payload;
            state.leads = [...state.leads, newLeadObj];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // Filter out the deleted user from the leads array
                state.leads = state.leads.filter((lead) => lead.user_id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { addNewLead } = leadsSlice.actions;

export default leadsSlice.reducer;
