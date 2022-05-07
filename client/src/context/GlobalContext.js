import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial state
const initialState = {
  user: null,
  fetchingUser: true,
  completeAppoitments: [],
  incompletedAppointments: [],
};

// Reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      };
    case "SET_COMPLETE_APPOINTMENTS":
      return {
        ...state,
        completeAppoitments: action.payload,
      };
    case "SET_INCOMPLETE_APPOINTMENTS":
      return {
        ...state,
        incompleteAppoitments: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        user: null,
        incompleteAppoitments: [],
        completeAppoitments: [],
        fetchingUser: false,
      };

    default:
      return state;
  }
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  // action: get current user
  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/auth/current");
      if (res.data) {
        const currentAppointments = await axios.get(
          "/api/appointments/myAppointments"
        );

        if (currentAppointments.data) {
          dispatch({ type: "SET_USER", payload: res.data });
          dispatch({
            type: "SET_COMPLETE_APPOINTMENTS",
            payload: currentAppointments.data.completedAppoitments,
          });
          dispatch({
            type: "SET_INCOMPLETE_APPOINTMENTS",
            payload: currentAppointments.data.incompletedAppoitments,
          });
        }
      } else {
        dispatch({ type: "RESET_USER" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.put("/api/auth/logout");

      dispatch({ type: "RESET_USER" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "RESET_USER" });
    }
  };

  const value = { ...state, getCurrentUser, logout };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
