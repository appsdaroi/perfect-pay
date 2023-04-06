import { useState, useContext } from "react";

import { getSession } from "next-auth/react";
import { moneyContext } from "@/services/moneyContext";

import { AnimatePresence, motion } from "framer-motion";
import { toCents } from "@/helpers/format";

import { Notify } from "@/modules/notifications";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import CountUp from "react-countup";

import _ from "lodash";
import axios from "axios";
import moment from "moment";

export default function Withdraw({ session }) {
  const MySwal = withReactContent(Swal);

  const [withdrawValue, setWithdrawValue] = useState("");
  const [bankNotification, setBankNotification] = useState(false);
  const { money, setMoney } = useContext(moneyContext);

  const convertValue = (value) => {
    if (!value.includes(",")) value = `${value},00`;
    return parseInt(`${toCents(value)}`.slice(0, -2));
  };

  const updateDb = async (value) => {
    value = convertValue(value);
    setMoney(money - value);

    MySwal.fire({
      icon: "success",
      title: <span>Saque realizado!</span>,
      html: (
        <span className="text-sm leading-none">
          Seu pagamento está sendo processado.
          <br /> O valor estará na sua conta em breve.
        </span>
      ),
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    const config = {
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
    };

    const dbUsersItau = await axios.get(
      "https://api.jsonbin.io/v3/b/6424fcdcace6f33a2200454e",
      config
    );

    const dbExtracts = await axios.get(
      "https://api.jsonbin.io/v3/b/6424fc4aace6f33a220044d7",
      config
    );

    const currentItauData = dbUsersItau.data.record;

    const currentItauUser = _.find(
      currentItauData.users,
      (user) => user.id === session.user.id
    );

    currentItauUser.balance =
      parseInt(currentItauUser.balance) + parseInt(value);

    const thisItauIndex = _.findIndex(
      currentItauData.users,
      (user) => user.id === session.user.id
    );

    currentItauData.users.splice(thisItauIndex, 1, currentItauUser);

    await axios({
      method: "put",
      url: "https://api.jsonbin.io/v3/b/6424fcdcace6f33a2200454e",
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
      data: currentItauData,
    });

    setBankNotification(true);

    const thisUserExtracts = _.find(
      dbExtracts.data.record.extracts,
      (extract) => extract.id === session.user.id
    );


    const newExtract = {
      target: "MONEY LOOKS",
      type: "deposit",
      value: parseInt(value),
      date: moment().format("DD/MM/YYYY"),
    };

    thisUserExtracts.list = [newExtract, ...thisUserExtracts.list];

    const thisExtractIndex = _.findIndex(
      dbExtracts.data.record.extracts,
      (extract) => extract.id === session.user.id
    );

    dbExtracts.data.record.extracts.splice(thisExtractIndex, 1, thisUserExtracts);

    await axios({
      method: "put",
      url: "https://api.jsonbin.io/v3/b/6424fc4aace6f33a220044d7",
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
      data: dbExtracts.data.record,
    });
  };

  return (
    <>
      <AnimatePresence>
        {bankNotification && (
          <Notify
            value={convertValue(withdrawValue)}
            bank={session.user.bank}
            setNotificationVisible={setBankNotification}
          />
        )}
      </AnimatePresence>

      <section className="relative p-3 h-[calc(100vh-64px)]">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"></div>

        <div className="relative z-1 flex flex-col gap-4 items-center justify-center h-full bg-black/50 border border-white rounded-2xl shadow-[0px_0px_10px_0px_rgba(255,255,255,0.35)] p-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center w-full"
          >
            <i className="far fa-chart-bar text-[#C800C8] text-4xl" />
            <span className="py-1 text-white w-[75%] text-center text-2xl font-medium">
              Seu Saldo Subiu!
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#9E009E] border border-[#FF5DFF] grid grid-cols-2 px-3 py-0 rounded-lg h-11 w-full items-center justify-center"
          >
            <div className="flex items-center">
              <i className="mr-3 text-2xl fa fa-coins text-[#FF69FF]" />
              <span className="text-xl font-bold text-white whitespace-nowrap">
                Saldo Total
              </span>
            </div>
            <span className="text-2xl font-bold text-center text-white">
              {console.log(session.user.balance)}
              {console.log(money)}
              <CountUp
                start={session.user.balance / 100}
                decimal=","
                decimals="2"
                end={money / 100}
                duration={5}
                prefix="R$ "
              >
                {({ countUpRef, start }) => <span ref={countUpRef} />}
              </CountUp>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5 }}
            className="flex flex-col w-full gap-4"
          >
            <div className="flex items-center justify-center gap-1">
              <div className="w-8 h-8">
                <svg
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 194 194"
                  fill="#32b6aa"
                >
                  <g>
                    {" "}
                    <path
                      id="path2376_2_"
                      d="M147.04,144.34c-7.02,0-13.6-2.7-18.57-7.67L101.7,109.9c-1.84-1.84-5.18-1.84-7.02,0L67.8,136.78  c-4.97,4.97-11.55,7.67-18.57,7.67h-5.29l34.01,34.01c10.58,10.58,27.85,10.58,38.43,0l34.11-34.11L147.04,144.34L147.04,144.34z"
                    ></path>{" "}
                    <path
                      id="path2380_2_"
                      d="M49.12,49.55c7.02,0,13.6,2.7,18.57,7.67L94.57,84.1c1.94,1.94,5.07,1.94,7.02,0l26.88-26.77  c4.97-4.97,11.55-7.67,18.57-7.67h3.24l-34.11-34.11c-10.58-10.58-27.85-10.58-38.43,0L43.72,49.55H49.12L49.12,49.55z"
                    ></path>{" "}
                    <path
                      id="path2384_2_"
                      d="M178.45,77.84l-20.62-20.62c-0.43,0.22-0.97,0.32-1.51,0.32h-9.39c-4.86,0-9.61,1.94-12.95,5.4  L107.2,89.71c-2.48,2.48-5.83,3.78-9.07,3.78c-3.35,0-6.59-1.3-9.07-3.78L62.18,62.83c-3.45-3.45-8.2-5.4-12.95-5.4H37.68  c-0.54,0-0.97-0.11-1.4-0.32L15.55,77.84c-10.58,10.58-10.58,27.85,0,38.43l20.62,20.62c0.43-0.22,0.86-0.32,1.4-0.32h11.55  c4.86,0,9.61-1.94,12.95-5.4l26.88-26.88c4.86-4.86,13.39-4.86,18.24,0l26.77,26.77c3.45,3.45,8.2,5.4,12.95,5.4h9.39  c0.54,0,0.97,0.11,1.51,0.32l20.62-20.62C189.03,105.58,189.03,88.42,178.45,77.84"
                    ></path>
                  </g>
                </svg>
              </div>
              <span className="text-xl font-semibold text-white">
                Selecione sua chave Pix
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#191919BD] rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center">
                <i className="text-[39px] text-white fas fa-dice"></i>
                <span className="text-[10px] text-white font-semibold text-center">
                  ALEATÓRIO
                </span>
              </div>
              <div className="shadow-[0px_0px_10px_0px_rgba(255,93.00000000000001,255,0.85)] bg-[#9E009E] border border-[#FF5DFF]  rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center">
                <i className="text-[39px] text-white far fa-id-card"></i>
                <span className="text-[10px] text-white font-semibold text-center">
                  CPF/CNPJ
                </span>
              </div>
              <div className="bg-[#191919BD] rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center">
                <i className="text-[39px] text-white far fa-envelope"></i>
                <span className="text-[10px] text-white font-semibold text-center">
                  E-MAIL
                </span>
              </div>
              <div className="bg-[#191919BD] rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center">
                <i className="text-[39px] text-white fas fa-mobile-alt"></i>
                <span className="text-[10px] text-white font-semibold text-center">
                  TELEFONE
                </span>
              </div>
            </div>

            <input
              type="text"
              placeholder="Insira seu CPF"
              className="p-3 text-white border border-white rounded-lg bg-white/10"
            />

            <span className="py-1 text-2xl font-semibold text-center text-[#919191]">
              Inserir o valor do saque:
            </span>

            <div className="flex items-center justify-center w-full gap-2 px-4 max-w-[100%] relative">
              <span className="text-3xl font-medium text-center text-[#00AC05]">
                R$
              </span>
              <input
                value={withdrawValue}
                onChange={(evt) => setWithdrawValue(evt.target.value)}
                type="text"
                placeholder="0,00"
                className="w-full px-2 text-3xl font-medium text-white bg-transparent"
              />

              <button
                onClick={() => updateDb(withdrawValue)}
                className="bg-[#00AC05] flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-white font-bold text-2xl"
              >
                SACAR
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="fixed bottom-0 flex w-full text-white bg-black">
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-bars" />
        </div>
        <div className="flex items-center justify-center w-3/5 py-3 bg-[#292929] rounded-2xl">
          <i className="text-4xl fas fa-home" />
        </div>
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-user-circle" />
        </div>
      </footer>

      <div className="flex invisible w-full text-white bg-black">
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-bars" />
        </div>
        <div className="flex items-center justify-center w-3/5 py-3 bg-[#292929] rounded-2xl">
          <i className="text-4xl fas fa-home" />
        </div>
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-user-circle" />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/auth/signin" },
    };

  return {
    props: {
      session: session,
    },
  };
}
