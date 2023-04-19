import geoIcon from "../../../assets/images/geo.svg";
import partnerIcon from "../../../assets/images/partner.svg";
import phoneIcon from "../../../assets/images/phone.svg";
import timerIcon from "../../../assets/images/timer.svg";
import endtimerIcon from "../../../assets/images/endtimer.svg";
import { getLeftTime } from "../../../helpers/getLeftMonth.ts";

interface ObjectData {
  DT: string;
  NAME: string;
  WORKER: string;
  CITY: string;
  PHONE: string;
  FRAN_NAME: string;
  STARTDT?: Date;
  ENDDT?: Date;
  status: boolean;
}

export function useInfoEntities(objectData: ObjectData) {
  const { DT, NAME, WORKER, CITY, PHONE, FRAN_NAME, STARTDT, ENDDT, status } =
    objectData || {};

  const { months, leftDays } = getLeftTime({
    start: new Date(),
    end: objectData?.ENDDT,
  });

  const packageTimeLeft = months
    ? months
    : "" + leftDays
    ? " " + leftDays
    : " ";

  return [
    [
      {
        img: null,
        title: "Название",
        content: NAME,
      },
      {
        img: null,
        title: "Дата создания",
        content: DT,
      },
      {
        img: null,
        title: "Специалист",
        content: WORKER,
      },
    ],
    [
      {
        img: geoIcon,
        title: "Город/Страна",
        content: CITY,
      },
      {
        img: partnerIcon,
        title: "Партнер",
        content: FRAN_NAME,
      },
      {
        img: phoneIcon,
        title: "Телефон",
        content: PHONE,
      },
    ],
    [
      {
        img: timerIcon,
        title: "Начало",
        content: status
          ? STARTDT?.toLocaleString().slice(0, 10)
          : "Пакет не активен",
      },
      {
        img: endtimerIcon,
        title: "Конец",
        content: status
          ? ENDDT?.toLocaleString().slice(0, 10)
          : "Пакет не активен",
      },
      {
        img: timerIcon,
        title: "Осталось",
        content: packageTimeLeft,
      },
    ],
  ];
}
