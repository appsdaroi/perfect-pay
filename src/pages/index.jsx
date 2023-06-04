import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react"

import Image from "next/image";

export default function Home({ session }) {
  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      <nav onClick={() => signOut()} className="bg-[#111111] border-b border-b-primary/10 p-5 flex gap-5 fixed top-0 w-full">
        <div className="flex-1">
          <h1 className="text-xl text-white">
            <span>Olá, </span>
            <span className="font-bold">Lucas Camargo</span>
          </h1>
          <span className="text-[0.85rem] text-primary font-medium">
            #TeamPerfectBlack
          </span>
        </div>

        <button className="p-3 border-2 rounded-full">
          <Image src="/icons/BELL.svg" width={22} height={22} />
        </button>

        <button>
          <Image src="/icons/MENU.svg" width={33} height={33} />
        </button>
      </nav>

      <nav className="bg-[#111111] border-b border-b-primary/10 p-5 flex gap-5 invisible">
        <div className="flex-1">
          <h1 className="text-xl text-white">
            <span>Olá, </span>
            <span className="font-bold">Lucas Camargo</span>
          </h1>
          <span className="text-[0.85rem] text-primary font-medium">
            #TeamPerfectBlack
          </span>
        </div>

        <button className="p-3 border-2 rounded-full">
          <Image src="/icons/BELL.svg" width={22} height={22} />
        </button>

        <button>
          <Image src="/icons/MENU.svg" width={33} height={33} />
        </button>
      </nav>

      <div className="flex flex-col flex-1 p-4 bg-black gap-7">
        <div className="bg-[#353b3b] w-full flex flex-col rounded-lg p-6 gap-2">
          <div className="flex items-center justify-between pt-3 text-white">
            <span className="text-lg opacity-60">Saldo total</span>

            <button className="mr-3">
              <Image
                className="opacity-80"
                src="/icons/EYE.svg"
                width={30}
                height={30}
              />
            </button>
          </div>

          <h1 className="text-[2.3rem] font-extrabold text-white">
            -R$ 2.182,20
          </h1>

          <div className="flex items-center justify-between mt-5">
            <div className="text-primary">
              <span className="text-[1.05rem] font-medium opacity-80">
                Disponível:
              </span>
              <h2 className="-mt-1 text-xl font-semibold">-R$ 3.055,01</h2>
            </div>

            <button className="flex items-center justify-between gap-4 p-2 rounded-full bg-primary">
              <span className="pl-3 text-[0.95rem] text-white">
                Saque agora
              </span>
              <span className="p-2.5 bg-white rounded-full">
                <Image src="/icons/CHEVRON-RIGHT.svg" width={20} height={20} />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-[1.15rem] font-medium">Hoje</span>
            <span className="font-bold text-[1.3rem]">R$ 0,00</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[1.15rem] font-medium">Ontem</span>
            <span className="font-bold text-[1.3rem]">R$ 0,00</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[1.15rem] font-medium">Esse mês</span>
            <span className="font-bold text-[1.3rem]">R$ 0,00</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[1.15rem] font-medium">Mês passado</span>
            <span className="font-bold text-[1.3rem]">R$ 7.905,13</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="text-xl font-semibold leading-none">Junho</h3>
            <span className="text-sm">Receita</span>
          </div>

          <div className="flex gap-2 text-[0.8rem]">
            <div className="px-[1.1rem] py-2.5 font-medium border rounded-full">
              7 dias
            </div>
            <div className="px-[1.1rem] py-2.5 font-medium border rounded-full opacity-50">
              14 dias
            </div>
            <div className="px-[1.1rem] py-2.5 font-medium border rounded-full opacity-50">
              31 dias
            </div>
          </div>

        </div>
      </div>

      <footer className="flex items-center justify-center invisible gap-24 pt-8 border-t border-t-primary/10 pb-14 bg-primary/10">
        <Image src="/icons/DASHBOARD.svg" width={28} height={28} />
        <Image src="/icons/STATISTICS.svg" width={28} height={28} />
        <Image src="/icons/GEAR.svg" width={28} height={28} />
      </footer>

      <footer className="fixed bottom-0 flex items-center justify-center w-full gap-24 pt-8 border-t border-t-primary/10 pb-14 bg-[#111111] before:top-0 before:absolute before:left-0 before:right-0 before:h-full before:z-[-1] z-[9999]">
        <Image src="/icons/DASHBOARD.svg" width={28} height={28} />
        <Image src="/icons/STATISTICS.svg" width={28} height={28} />
        <Image src="/icons/GEAR.svg" width={28} height={28} />
      </footer>
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
