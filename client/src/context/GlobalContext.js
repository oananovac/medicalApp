import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial state
const initialState = {
  user: null,
  fetchingUser: true,
  completeAppointments: [],
  incompleteAppointments: [],
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
        completeAppointments: action.payload,
      };
    case "SET_INCOMPLETE_APPOINTMENTS":
      return {
        ...state,
        incompleteAppointments: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        user: null,
        incompleteAppointments: [],
        completeAppointments: [],
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
            payload: currentAppointments.data.completedAppointments,
          });
          dispatch({
            type: "SET_INCOMPLETE_APPOINTMENTS",
            payload: currentAppointments.data.incompletedAppointments,
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

  const removeAppointment = (appointment) => {
    if (appointment.completed) {
      dispatch({
        type: "SET_COMPLETE_APPOINTMENTS",
        payload: state.completeAppointments.filter(
          (app) => appointment._id !== app._id
        ),
      });
    } else {
      dispatch({
        type: "SET_INCOMPLETE_APPOINTMENTS",
        payload: state.incompleteAppointments.filter(
          (app) => appointment._id !== app._id
        ),
      });
    }
  };

  const addAppointment = (appointment) => {
    dispatch({
      type: "SET_INCOMPLETE_APPOINTMENTS",
      payload: [appointment, ...state.incompleteAppointments],
    });
  };

  const completeAppointment = (appointment) => {
    dispatch({
      type: "SET_INCOMPLETE_APPOINTMENTS",
      payload: state.incompleteAppointments.filter(
        (app) => appointment._id !== app._id
      ),
    });

    dispatch({
      type: "SET_COMPLETE_APPOINTMENTS",
      payload: [appointment, ...state.completeAppointments],
    });
  };

  const updateAppointment = (newAppointment) => {
    if (newAppointment.completed) {
      const updatedApp = state.completeAppointments.map((old) =>
        old._id !== newAppointment._id ? old : newAppointment
      );

      dispatch({ type: "SET_COMPLETE_APPOINTMENTS", payload: updatedApp });
    } else {
      const updatedAppIncomplete = state.incompleteAppointments.map(
        (incomplete) =>
          incomplete._id !== newAppointment._id ? incomplete : newAppointment
      );

      dispatch({
        type: "SET_INCOMPLETE_APPOINTMENTS",
        payload: updatedAppIncomplete,
      });
    }
  };

  const value = {
    ...state,
    getCurrentUser,
    logout,
    addAppointment,
    removeAppointment,
    completeAppointment,
    updateAppointment,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
