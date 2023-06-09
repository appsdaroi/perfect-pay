import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";

import { ReaisToCents } from "../helpers/money"

import _ from "lodash";
import axios from "axios";

export default function Home({ session, profileState }) {
  const [saving, setSaving] = useState(false);
  
  const updateProfile = async (evt) => {
    setSaving(true);
    evt.preventDefault();

    const name = evt.target.name.value;
    const balance = evt.target.balance.value;
    const balanceToday = evt.target.balanceToday.value;
    const balanceYesterday = evt.target.balanceYesterday.value;
    const balanceThisMonth = evt.target.balanceThisMonth.value;
    const balanceLastMonth = evt.target.balanceLastMonth.value;

    if (!name || !balance) return setSaving(false);

    const config = {
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
    };

    const db = await axios.get(
      "https://api.jsonbin.io/v3/b/647e71efb89b1e2299aa7397",
      config
    );

    const records = db.data.record;

    const thisIndex = _.findIndex(
      records.users,
      (user) => user.username === session.user.username
    );

    const thisUser = records.users[thisIndex];
    thisUser.name = name;
    thisUser.balance = ReaisToCents(balance);
    thisUser.balanceToday = ReaisToCents(balanceToday);
    thisUser.balanceYesterday = ReaisToCents(balanceYesterday);
    thisUser.balanceThisMonth = ReaisToCents(balanceThisMonth);
    thisUser.balanceLastMonth = ReaisToCents(balanceLastMonth);

    records.users.splice(thisIndex, 1, thisUser);

    await axios({
      method: "put",
      url: "https://api.jsonbin.io/v3/b/647e71efb89b1e2299aa7397",
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
      data: records,
    });

    return setTimeout(() => {
      signOut();
    }, 500);
  };

  return (
    <div className="w-screen h-screen p-4">
      <form onSubmit={updateProfile} className="flex flex-col gap-5">
        <input
          placeholder="Digite o nome..."
          type="text"
          name="name"
          className="p-3 text-white bg-transparent border rounded"
        />

        <input
          placeholder="Digite o saldo..."
          type="number"
          name="balance"
          className="p-3 text-white bg-transparent border rounded"
        />

        <input
          placeholder="Digite o saldo Hoje..."
          type="number"
          name="balanceToday"
          className="p-3 text-white bg-transparent border rounded"
        />

        <input
          placeholder="Digite o saldo Ontem..."
          type="number"
          name="balanceYesterday"
          className="p-3 text-white bg-transparent border rounded"
        />

        <input
          placeholder="Digite o saldo Esse mês..."
          type="number"
          name="balanceThisMonth"
          className="p-3 text-white bg-transparent border rounded"
        />

        <input
          placeholder="Digite o saldo Esse mês..."
          type="number"
          name="balanceLastMonth"
          className="p-3 text-white bg-transparent border rounded"
        />

        <button
          type="submit"
          className={`w-full p-3 bg-white rounded ${
            saving && "opacity-50 pointer-events-none"
          }`}
          disabled={saving}
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>

        <Link
          href="/"
          className={`w-full text-sm text-center text-white ${
            saving && "opacity-50 pointer-events-none"
          }`}
        >
          Voltar
        </Link>
      </form>
    </div>
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
