import { AndroidNotification } from "./android";
import { IOSNotification } from "./ios";

import { isIOS } from "react-device-detect";

import { randomBetweenRange } from "@/helpers/random";
import { toDollars } from "@/helpers/format";

import moment from "moment";
import 'moment-timezone';

const Notify = ({ value, setNotificationVisible }) => {

    const banks = {
        1: {
            icon: "nu",
            bank: <span className="text-xs text-purple-700">Nubank&nbsp;</span>,
            title: "Transferência recebida",
            description: `Você recebeu uma transferência de ${toDollars(value)} de MONEY LOOKS.`
        },
        2: {
            icon: "inter",
            bank: <span className="text-xs text-orange-700">Inter&nbsp;</span>,
            title: "Pix recebido",
            description: `Você recebeu um Pix no valor de ${toDollars(value)}.`
        },
        3: {
            icon: "itau",
            bank: <span className="text-xs text-blue-800">Itaú&nbsp;</span>,
            title: "Pix recebido com sucesso",
            description: `Você recebeu um pix de MONEY LOOKS, no valor de ${toDollars(value)} em ${moment().format("DD/MM/YYYY")}.`
        },

    }

  return (
    <>
      {isIOS ? (
        <IOSNotification data={banks[3]} setNotification={setNotificationVisible} value={value}/>
      ) : (
        <AndroidNotification data={banks[3]} setNotification={setNotificationVisible} value={value}/>
      )}
    </>
  );
};

export { Notify };
