import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  selectObjectsIds,
  selectObjectsIsLoading,
} from "../../../src/store/Objects/selectors";
import { Table } from "../../Components/Table/Table";
import { ObjectDataContainer } from "../../Containers/ObjectDataContainer/ObjectDataContainer";
import { ButtonBar } from "../../Components/ButtonsBar/ButtonsBar";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { AddObjectForm } from "../../Components/AddObjectForm/AddObjectForm";
import { useSingleEffect } from "../../hooks/UseSingleEffect";
import { getObjects } from "../../store/Objects/Thunks/getObjects";
import { TableHeaderFiltered } from "../../Components/TableHeaderFiltered/TableHeaderFiltered";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";
import { nanoid } from "nanoid";
import { useToggleState } from "../../hooks/UseToggleState";
import addImage from "../../assets/images/add.svg";
import resetImage from "../../assets/images/reset filter.svg";
import { Loading } from "../../Widgets/Loading/Loading";
import { getFransheses } from "../../store/Franshises/Thunks/getFransheses";

const images = [addImage, resetImage];

const OBJECT_HEADERS = [
  "ID",
  "Название",
  "Город",
  "Телефон",
  "Дата",
  "Партнер",
  "Баланс",
];

const Objects = () => {
  const dispatch = useDispatch();
  const userId = localStorage.userId;
  useSingleEffect(() => {
    dispatch(getObjects({ userId }));
    dispatch(getFransheses({ userId }));
  }, []);
  const isLoading = useSelector((state) => selectObjectsIsLoading(state));
  const objectsIds = useSelector((state) => selectObjectsIds(state));
  const [isPopupOpened, setIsPopupOpened] = useToggleState(false);
  const resetFilter = () => dispatch(onjectFilterSliceActions.resetFilter());

  useSingleEffect(() => {}, [userId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.objects_wrapper}>
      <>
        <Table>
          <TableHeaderFiltered headers={OBJECT_HEADERS} />
          {objectsIds?.map((id) => (
            <ObjectDataContainer key={nanoid()} id={id} />
          ))}
        </Table>
        <ButtonBar onClicks={[setIsPopupOpened, resetFilter]} images={images} />
      </>
      {isPopupOpened && (
        <PopupContainer togglePopup={setIsPopupOpened}>
          <AddObjectForm togglePopup={setIsPopupOpened} />
        </PopupContainer>
      )}
    </div>
  );
};

export default Objects;
