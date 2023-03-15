import { useDispatch } from "react-redux";
import { useToggleState } from "../../hooks/UseToggleState";
import { updateLicense } from "../../store/Objects/Thunks/updateLicense";
import { Button } from "../../UI/Button/Button";
import { CustomAlert } from "../CustomAlert/CustomAlert.tsx";
import styles from "./styles.module.css";

type PropType = {
  TMPCODE: string;
  id: string | number;
};

export const LicenseManager = ({ TMPCODE, id }: PropType) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useToggleState(false);
  const [isAlertOpened, setIsAlertOpened] = useToggleState(false);
  function updateCode() {
    setIsDisabled();
    // setIsAlertOpened();
    dispatch(updateLicense({ id }));
  }
  return (
    <div className={styles.wrapper}>
      {!isAlertOpened && (
        <>
          <div className={styles.license}>
            {"Текущий код активации: " + TMPCODE}
            <button
              className={styles.copy}
              onClick={() => {
                navigator.clipboard.writeText(TMPCODE);
              }}
            />
          </div>
          <Button
            disabled={isDisabled}
            label={"Обновить код"}
            onclick={() => setIsAlertOpened()}
          />
        </>
      )}
      {isAlertOpened && <CustomAlert updateCode={updateCode} />}
    </div>
  );
};
