import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./CompanySlice";
import customerReducer from "./CustomerSlice";

/**
 * Configures the Redux store for the application.
 * Combines reducers for managing state related to companies and customers.
 */

const store = configureStore({
    reducer: {
        companies: companyReducer,
        customers: customerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
