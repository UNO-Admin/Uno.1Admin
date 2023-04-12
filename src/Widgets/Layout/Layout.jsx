import classNames from "classnames";
import { lazy, Suspense, useEffect } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import { ROUTES } from "../../assets/constants/Fixtires";
import { Menu } from "../../Components/Menu/Menu";
import { useToggleState } from "../../hooks/UseToggleState";
import { Object } from "../../Pages/Object/Object";
import { User } from "../../Pages/User/User";
import { Loading } from "../Loading/Loading";
import styles from "./styles.module.css";

const Users = lazy(() => import("../../Pages/Users/Users"));
const Profile = lazy(() => import("../../Pages/Profile/Profile"));
const Objects = lazy(() => import("../../Pages/Objects/Objects"));

export const Layout = () => {
  const navigate = useNavigate();
  const [asideIsOpened, setAsideIsOpened] = useToggleState(true);
  useEffect(() => {
    if (!user) {
      navigate(ROUTES.auth);
    }
  }, []);
  const user = localStorage.getItem("user");

  return (
    <div className={styles.cabinet}>
      <header
        className={classNames(styles.header, {
          [styles.header_moved]: !asideIsOpened,
        })}
      >
        <button
          type="button"
          className={classNames(styles.button, styles.header_button)}
          onClick={() => setAsideIsOpened()}
        ></button>
      </header>
      <Menu asideIsOpened={asideIsOpened} />
      <section
        className={classNames(styles.content, {
          [styles.content_moved]: !asideIsOpened,
        })}
      >
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={ROUTES.users} element={<Users />} />
            <Route path={ROUTES.profile} element={<Profile />} />
            <Route path={ROUTES.objects} element={<Objects />} />
            <Route path={ROUTES.object} element={<Object />} />
            <Route path={ROUTES.user} element={<User />} />
          </Routes>
        </Suspense>
      </section>
    </div>
  );
};
