

// // import React, { createContext, useContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import { useRouter } from "next/router";
// // import { toast } from "sonner";

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [state, setState] = useState({
// //     user: null,
// //     authenticated: false,
// //     loading: true,
// //     error: null,
// //   });

// //   const router = useRouter();

// //   // Load user and user history from localStorage on mount
// //   useEffect(() => {
// //     const initializeAuth = async () => {
// //       const token = localStorage.getItem("token");
// //       const email = localStorage.getItem("email");
// //       console.log(token,"token")
// //       console.log(email,"email")
// //       if (token && email) {
// //         try {
// //           const response = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
// //             params: { email },
// //           });

// //           const userHistory = response.data;

// //           setState({
// //             user: {
// //               email,
// //               userHistory, 
// //             },
// //             authenticated: true,
// //             loading: false,
// //             error: null,
// //           });

// //         } catch (error) {
// //           console.error("Failed to fetch user data", error);
// //           setState({
// //             user: null,
// //             authenticated: false,
// //             loading: false,
// //             error: "Failed to fetch user data.",
// //           });

// //           if (router.pathname !== "/login" && router.pathname !== "/signup") {
// //             router.push("/login");
// //           }
// //         }
// //       } else {
// //         setState({
// //           user: null,
// //           authenticated: false,
// //           loading: false,
// //           error: "An error occurred during login.",
// //         });

// //         if (router.pathname !== "/login" && router.pathname !== "/signup") {
// //           router.push("/login");
// //         }
// //       }
// //     };

// //     initializeAuth();
// //   }, []);

// //   // Login function
// //   const login = async (email, password) => {
// //     setState({ ...state, loading: true, error: null });

// //     try {
// //       const loginResponse = await axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, {
// //         email,
// //         password,
// //       });

// //       console.log(loginResponse,"loginResponse")

// //       const { accessToken } = loginResponse.data;

// //       // Save token and email to localStorage
// //       localStorage.setItem("token", accessToken);
// //       localStorage.setItem("email", email);

// //       // Fetch user history after login
// //       const userHistoryResponse = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
// //         params: { email },
// //       });

// //       const userHistory = userHistoryResponse.data;

// //       // Update state with user data and history
// //       setState({
// //         user: {
// //           email,
// //           userHistory,
// //         },
// //         authenticated: true,
// //         loading: false,
// //         error: null,
// //       });

// //       window.location.href = "/app"; // Redirect to /app
// //     } catch (error) {
// //       console.error("Authentication error", error);
// //       setState({
// //         user: null,
// //         authenticated: false,
// //         loading: false,
// //         error: "An error occurred during login.",
// //       });
// //     }
// //   };

// //   // Signup function
// //   const signup = async (email, password, confirmPassword) => {
// //     setState((prevState) => ({ ...prevState, loading: true, error: null }));

// //     if (password !== confirmPassword) {
// //       setState((prevState) => ({
// //         ...prevState,
// //         loading: false,
// //         error: "Passwords do not match.",
// //       }));
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(process.env.NEXT_PUBLIC_SIGNUP_URL, {
// //         email,
// //         password,
// //       });

// //       const userData = response.data;

// //       setState({
// //         user: userData,
// //         authenticated: true,
// //         loading: false,
// //         error: null,
// //       });

// //       localStorage.setItem("user", JSON.stringify(userData));
// //       window.location.replace("/app");
// //     } catch (error) {
// //       setState((prevState) => ({
// //         ...prevState,
// //         loading: false,
// //         error: "An error occurred during signup.",
// //       }));
// //     }
// //   };

// //   // Logout function
// //   const logout = () => {
// //     setState({
// //       user: null,
// //       authenticated: false,
// //       loading: false,
// //       error: null,
// //     });
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("email");
// //     router.push("/login");
// //   };

// //   const resetError = () => {
// //     setState((prevState) => ({ ...prevState, error: null }));
// //   };

// //   return (
// //     <AuthContext.Provider value={{ state, login, signup, logout, resetError }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };



// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [state, setState] = useState({
//     user: null,
//     authenticated: false,
//     loading: true,
//     error: null,
//   });
//   const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar
//   const router = useRouter();

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // Load user and user history from localStorage on mount
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem("token");
//       const email = localStorage.getItem("email");

//       if (token && email) {
//         try {
//           const response = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
//             params: { email },
//           });

//           const userHistory = response.data;

//           setState({
//             user: {
//               email,
//               userHistory,
//             },
//             authenticated: true,
//             loading: false,
//             error: null,
//           });

//         } catch (error) {
//           console.error("Failed to fetch user data", error);
//           setState({
//             user: null,
//             authenticated: false,
//             loading: false,
//             error: "Failed to fetch user data.",
//           });
//           console.log("catch caled")
//           setSnackbarOpen(true); // Show Snackbar on error

//           if (router.pathname !== "/login" && router.pathname !== "/signup") {
//             router.push("/login");
//           }
//         }
//       } else {
//         setState({
//           user: null,
//           authenticated: false,
//           loading: false,
//           error: "An error occurred during login.",
//         });
//         console.log("catch caled in else")


//         if (router.pathname !== "/login" && router.pathname !== "/signup") {
//           router.push("/login");
//         }
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     setState({ ...state, loading: true, error: null });

//     try {
//       const loginResponse = await axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, {
//         email,
//         password,
//       });

//       const { accessToken } = loginResponse.data;

//       // Save token and email to localStorage
//       localStorage.setItem("token", accessToken);
//       localStorage.setItem("email", email);

//       // Fetch user history after login
//       const userHistoryResponse = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
//         params: { email },
//       });

//       const userHistory = userHistoryResponse.data;

//       // Update state with user data and history
//       setState({
//         user: {
//           email,
//           userHistory,
//         },
//         authenticated: true,
//         loading: false,
//         error: null,
//       });

//       window.location.href = "/app"; // Redirect to /app
//     } catch (error) {
//       console.error("Authentication error", error);
//       setState({
//         user: null,
//         authenticated: false,
//         loading: false,
//         error: "An error occurred during login.",
//       });
//       setSnackbarOpen(true); // Show Snackbar on error
//     }
//   };

//   // Signup function
//   const signup = async (email, password, confirmPassword) => {
//     setState((prevState) => ({ ...prevState, loading: true, error: null }));

//     if (password !== confirmPassword) {
//       setState((prevState) => ({
//         ...prevState,
//         loading: false,
//         error: "Passwords do not match.",
//       }));
//       setSnackbarOpen(true); // Show Snackbar on error
//       return;
//     }

//     try {
//       const response = await axios.post(process.env.NEXT_PUBLIC_SIGNUP_URL, {
//         email,
//         password,
//       });

//       const userData = response.data;

//       setState({
//         user: userData,
//         authenticated: true,
//         loading: false,
//         error: null,
//       });

//       localStorage.setItem("user", JSON.stringify(userData));
//       window.location.replace("/app");
//     } catch (error) {
//       setState((prevState) => ({
//         ...prevState,
//         loading: false,
//         error: "An error occurred during signup.",
//       }));
//       setSnackbarOpen(true); // Show Snackbar on error
//     }
//   };

//   // Logout function
//   const logout = () => {
//     setState({
//       user: null,
//       authenticated: false,
//       loading: false,
//       error: null,
//     });
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     router.push("/login");
//   };

//   const resetError = () => {
//     setState((prevState) => ({ ...prevState, error: null }));
//   };

//   return (
//     <AuthContext.Provider value={{ state, login, signup, logout, resetError }}>
//       {children}
//       {snackbarOpen &&      <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
//           {state.error}
//         </Alert>
//       </Snackbar>}
 
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Snackbar, Alert } from "@mui/material";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    authenticated: false,
    loading: true,
    error: null,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to hold the Snackbar message
  const router = useRouter();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  // Load user and user history from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (token && email) {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
            params: { email },
          });

          const userHistory = response.data;

          setState({
            user: {
              email,
              userHistory,
            },
            authenticated: true,
            loading: false,
            error: null,
          });

        } catch (error) {
          console.error("Failed to fetch user data", error);
          setState({
            user: null,
            authenticated: false,
            loading: false,
            error: "Failed to fetch user data.",
          });
          setSnackbarMessage("Failed to fetch user data.");
          setSnackbarOpen(true); // Show Snackbar on error

          if (router.pathname !== "/login" && router.pathname !== "/signup") {
            router.push("/login");
          }
        }
      } else {
        setState({
          user: null,
          authenticated: false,
          loading: false,
          error: "An error occurred during login.",
        });
        setSnackbarMessage("An error occurred during login.");
        // setSnackbarOpen(true); // Show Snackbar on error

        if (router.pathname !== "/login" && router.pathname !== "/signup") {
          router.push("/login");
        }
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setState({ ...state, loading: true, error: null });

    try {
      const loginResponse = await axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, {
        email,
        password,
      });

      const { accessToken } = loginResponse.data;

      // Save token and email to localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("email", email);

      // Fetch user history after login
      const userHistoryResponse = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
        params: { email },
      });

      const userHistory = userHistoryResponse.data;

      // Update state with user data and history
      setState({
        user: {
          email,
          userHistory,
        },
        authenticated: true,
        loading: false,
        error: null,
      });

      window.location.href = "/app"; // Redirect to /app
    } catch (error) {
      console.error("Authentication error", error);
      setState({
        user: null,
        authenticated: false,
        loading: false,
        error: "An error occurred during login.",
      });
      setSnackbarMessage("An error occurred during login.");
      setSnackbarOpen(true); // Show Snackbar on error
    }
  };

  // Signup function
  const signup = async (email, password, confirmPassword) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    if (password !== confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: "Passwords do not match.",
      }));
      setSnackbarMessage("Passwords do not match.");
      setSnackbarOpen(true); // Show Snackbar on error
      return;
    }

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SIGNUP_URL, {
        email,
        password,
      });

      const userData = response.data;

      setState({
        user: userData,
        authenticated: true,
        loading: false,
        error: null,
      });

      localStorage.setItem("user", JSON.stringify(userData));
      window.location.replace("/app");
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: "An error occurred during signup.",
      }));
      setSnackbarMessage("An error occurred during signup.");
      setSnackbarOpen(true); // Show Snackbar on error
    }
  };

  // Logout function
  const logout = () => {
    setState({
      user: null,
      authenticated: false,
      loading: false,
      error: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.push("/login");
  };

  const resetError = () => {
    setState((prevState) => ({ ...prevState, error: null }));
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout, resetError }}>
      {children}
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
            {snackbarMessage} {/* Display the Snackbar message */}
          </Alert>
        </Snackbar>
      )}
    </AuthContext.Provider>
  );
};
