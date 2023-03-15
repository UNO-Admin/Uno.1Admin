import { useToggleState } from "../../hooks/UseToggleState";
import { Button } from "../../UI/Button/Button";
import styles from "./styles.module.css";
import { Loading } from "../../Widgets/Loading/Loading";

type PropTypes = {
  updateCode: () => void;
};

export const CustomAlert = ({ updateCode }: PropTypes) => {
  const [isLoding, setIsLoading] = useToggleState();
  const [isDisabled, setIsDisabled] = useToggleState(false);
  const onClick = () => {
    setIsLoading();
    setIsDisabled();
    updateCode();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.alert}>
        {
          "Внимание! Это действие приведет к аннулированию активации на устройствах. Подтвердите действие, если уверены."
        }
      </div>
      <Button disabled={isDisabled} label={"Обновить код"} onclick={onClick} />
      {isLoding && <Loading />}
    </div>
  );
};
