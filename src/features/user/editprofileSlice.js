import {createSlice} from "@reduxjs/toolkit";

export const editProfileSlice = createSlice({

    name: "profile",
    initialState: {
        edit: false
    },
    reducers: {

        changeState: (state) => {

            state.edit = !state.edit;

        }
    }

});

export const {changeState} = editProfileSlice.actions;

export const selectProfileState = (state) => state.profile.edit;
export default editProfileSlice.reducer;