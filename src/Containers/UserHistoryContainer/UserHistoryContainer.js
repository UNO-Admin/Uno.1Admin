import styles from "./styles.module.css";
import { UserData } from "../../Components/UserData/UserData";
import { useCallback } from "react";
import { ROUTES } from "../../assets/constants/Fixtires";
import { useNavigate } from "react-router-dom";

export function UserHistoryContainer({ data, id }) {
  const navigate = useNavigate();

  const onDbClick = useCallback(() => {
    if (id) {
      navigate(ROUTES.objects + "/" + id);
    }
  }, [id]);
  return (
    <tr className={styles.table_row} onDoubleClick={() => onDbClick()}>
      <UserData data={data} />
    </tr>
  );
}
