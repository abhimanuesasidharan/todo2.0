import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './routes/root';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Todos from './routes/todos';
import Login from './routes/login';
import store from './app/store'
import { Provider } from 'react-redux'
import Home from './routes/home';
import SignUp from './routes/signup';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "todos",
        element: <Todos/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "signup",
        element: <SignUp/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
