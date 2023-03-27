import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserHistoryById } from "../../store/UserHistory/selectors";
import { getHistoryUserIfNotExist } from "../../store/UserHistory/Thunks/getHistoryUserIfNotExist";
import { Table } from "../../Components/Table/Table";
import { TableHeader } from "../../Components/TableHeader/TableHeader";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import { UserHistoryContainer } from "../../Containers/UserHistoryContainer/UserHistoryContainer";
import { USER_HISTORY_HEADERS } from "../../assets/constants/Fixtires";

export const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getHistoryUserIfNotExist({ id }));
  }, [id]);

  const userHistoryData = useSelector((state) =>
    selectUserHistoryById(state, { id })
  );
  let objIds = [];

  const userHistoryDataArray = userHistoryData.map((el) => {
    objIds = objIds.concat(el.IDORG);
    return [el.DT, el.USR, el.NAME, el.OPER, el.AMOUNT];
  });

  if (userHistoryData.length == 0) {
    return null;
  }

  return (
    <div className={styles.user}>
      <Table>
        <TableHeader headers={USER_HISTORY_HEADERS} />
        {userHistoryDataArray?.map((el, idx) => (
          <UserHistoryContainer key={nanoid()} data={el} id={objIds[idx]} />
        ))}
      </Table>
    </div>
  );
};
