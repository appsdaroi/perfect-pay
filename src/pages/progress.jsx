import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { getSession } from "next-auth/react";
import ProgressBar from "@/modules/progressBar";

import { motion } from "framer-motion";

export default function Home({ session }) {
  const router = useRouter();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    for (var i = 0; i <= 100; i++) {
      (function (ind) {
        setTimeout(function () {
          setProgress(ind);
        }, 50 * ind);
      })(i);
    }
    
    setTimeout(() => {
      router.push("/withdraw")
    }, 7000);
  }, []);

  return (
    <>
      <section className="relative p-3 h-[calc(100vh-64px)]">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"></div>

        <div className="relative z-1 flex flex-col gap-4 items-center justify-center h-full bg-black/50 border border-white rounded-2xl shadow-[0px_0px_10px_0px_rgba(255,255,255,0.35)] p-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center w-full items-top"
          >
            <i className="fab fa-telegram-plane text-[#C800C8] text-3xl w-[12%] ml-auto" />
            <span className="py-1 font-extrabold text-white w-[85%] text-center text-xl leading-none pr-3">
              ENVIANDO SUA <br />
              AVALIAÇÃO
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center w-full bg-[#9E009E] border border-[#FF5DFF] rounded-lg"
          >
            <ProgressBar bgcolor="black" completed={progress} />
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
