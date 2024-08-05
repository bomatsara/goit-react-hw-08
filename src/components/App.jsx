import Section from './layout/Section/Section';
import {Suspense, useEffect, lazy} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsRefreshing} from "../redux/auth/selectors.js";
import {refreshUser} from "../redux/auth/operations.js";
import {Route, Routes} from "react-router-dom";
import RestrictedRoute from "./Route/RestrictedRoute.jsx";
import PrivateRoute from "./Route/PrivateRoute.jsx";
import Header from "./Header/Header.jsx";
import Notification from './Notification/Notification.jsx'

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
      <div>Refreshing user please wait...</div>
  ) : (
    <>
      <Notification />
      <Header />
      <Section>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/register"
                element={
                  <RestrictedRoute
                      component={<RegisterPage />}
                      redirectTo="/contacts"
                  />
                }
            />
            <Route
                path="/login"
                element={
                  <RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />
                }
            />
            <Route
                path="/contacts"
                element={
                  <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
                }
            />
          </Routes>
        </Suspense>
      </Section>
    </>
  );
}