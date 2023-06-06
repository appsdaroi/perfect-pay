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

    return signOut();
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

        <span className="text-xs text-center text-white opacity-50">
          Os outros dados, como histórico de saldo e saldo disponível são
          calculados automaticamente.
        </span>

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