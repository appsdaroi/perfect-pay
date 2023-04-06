import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link'

export default function Home({ session }) {
  return (
    <>
      <nav className="fixed top-0 z-50 flex items-center w-full gap-5 px-3 py-2 font-bold text-white bg-black">
        <div className="bg-[#9E009E] border border-[#FF5DFF] grid grid-cols-2 px-3 py-0 rounded-lg h-11 flex-1 items-center justify-center">
          <div className="flex items-center">
            <i className="mr-3 text-2xl fa fa-coins text-[#FF69FF]" />
            SALDO
          </div>
          <span className="text-center">R$ 658,00</span>
        </div>

        <div className="bg-[#00AC05] flex items-center justify-center gap-1 px-3 py-3 rounded-lg mr-2 animate__pulse">
          <div className="w-4 h-4">
            <svg
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 194 194"
              fill="white"
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
          SACAR
        </div>
      </nav>

      <div className="top-0 flex items-center invisible w-full gap-5 px-3 py-2 font-bold text-white bg-black">
        <div className="bg-[#9E009E] border border-[#FF5DFF] grid grid-cols-2 px-3 py-0 rounded-lg h-11 flex-1 items-center justify-center">
          <div className="flex items-center">
            <i className="mr-3 text-2xl fa fa-coins text-[#FF69FF]" />
            SALDO
          </div>
          <span className="text-center">R$ 658,00</span>
        </div>

        <div className="bg-[#00AC05] flex items-center justify-center gap-1 px-3 py-3 rounded-lg mr-2 animate__pulse">
          <div className="w-4 h-4">
            <svg
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 194 194"
              fill="white"
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
          SACAR
        </div>
      </div>

      <section className="relative px-3 pb-3">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"></div>

        <span className="relative flex items-center justify-center gap-2 pt-2 pb-1 text-xl text-white z-1">
          <span>
            <i className="fas fa-tshirt" />
          </span>
          <span className="font-black">AVALIE OS LOOKS ABAIXO:</span>
        </span>

        <div className="relative z-1 flex flex-col items-center justify-center bg-black border border-white rounded-xl shadow-[0px_0px_10px_0px_rgba(255,255,255,0.35)]">
          <Image
            src="/logo-shien.png"
            width={170}
            height={100}
            className="py-2"
          />
          <div className="relative w-[94%] h-[422px]">
            <Image src="/1.png" layout="fill" objectFit="contain" />
          </div>

          <span className="py-1 text-lg font-extrabold text-white">
            VOCÊ GOSTOU DESSE LOOK?
          </span>

          <div className="grid items-center justify-center grid-cols-2 gap-10 pb-4">
            <a
              href="#2"
              className="shadow-[-1px_0px_13px_5px_rgba(23.999999999999858,255,0,0.29)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#139A05] border border-[#18FF00] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-up"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                SIM, GOSTEI
              </span>
            </a>

            <a
              href="#2"
              className="shadow-[-1px_0px_13px_5px_rgba(255,0,0,0.38)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#A70202] border border-[#FF0000] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-down"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                NÃO GOSTEI
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="2" className="relative p-3">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"></div>

        <div className="relative z-1 flex flex-col items-center justify-center bg-black border border-white rounded-xl shadow-[0px_0px_10px_0px_rgba(255,255,255,0.35)]">
          <Image
            src="/logo-shien.png"
            width={170}
            height={100}
            className="py-2"
          />
          <div className="relative w-[94%] h-[422px]">
            <Image src="/2.png" layout="fill" objectFit="contain" />
          </div>

          <span className="py-1 text-lg font-extrabold text-white">
            VOCÊ GOSTOU DESSE LOOK?
          </span>

          <div className="grid items-center justify-center grid-cols-2 gap-10 pb-4">
            <a
              href="#3"
              className="shadow-[-1px_0px_13px_5px_rgba(23.999999999999858,255,0,0.29)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#139A05] border border-[#18FF00] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-up"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                SIM, GOSTEI
              </span>
            </a>

            <a
              href="#3"
              className="shadow-[-1px_0px_13px_5px_rgba(255,0,0,0.38)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#A70202] border border-[#FF0000] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-down"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                NÃO GOSTEI
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="3" className="relative p-3">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"></div>

        <div className="relative z-1 flex flex-col items-center justify-center bg-black border border-white rounded-xl shadow-[0px_0px_10px_0px_rgba(255,255,255,0.35)]">
          <Image
            src="/logo-shien.png"
            width={170}
            height={100}
            className="py-2"
          />
          <div className="relative w-[94%] h-[422px]">
            <Image src="/3.png" layout="fill" objectFit="contain" />
          </div>

          <span className="py-1 text-lg font-extrabold text-white">
            VOCÊ GOSTOU DESSE LOOK?
          </span>

          <div className="grid items-center justify-center grid-cols-2 gap-10 pb-4">
            <a
              href="#4"
              className="shadow-[-1px_0px_13px_5px_rgba(23.999999999999858,255,0,0.29)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#139A05] border border-[#18FF00] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-up"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                SIM, GOSTEI
              </span>
            </a>

            <a
              href="#4"
              className="shadow-[-1px_0px_13px_5px_rgba(255,0,0,0.38)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#A70202] border border-[#FF0000] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-down"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                NÃO GOSTEI
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="4" className="relative p-3">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"></div>

        <div className="relative z-1 flex flex-col items-center justify-center bg-black border border-white rounded-xl shadow-[0px_0px_10px_0px_rgba(255,255,255,0.35)]">
          <Image
            src="/logo-shien.png"
            width={170}
            height={100}
            className="py-2"
          />
          <div className="relative w-[94%] h-[422px]">
            <Image src="/4.png" layout="fill" objectFit="contain" />
          </div>

          <span className="py-1 text-lg font-extrabold text-white">
            VOCÊ GOSTOU DESSE LOOK?
          </span>

          <div className="grid items-center justify-center grid-cols-2 gap-10 pb-4">
            <Link
              href="/progress"
              className="shadow-[-1px_0px_13px_5px_rgba(23.999999999999858,255,0,0.29)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#139A05] border border-[#18FF00] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-up"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                SIM, GOSTEI
              </span>
            </Link>

            <Link
              href="/progress"
              className="shadow-[-1px_0px_13px_5px_rgba(255,0,0,0.38)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#A70202] border border-[#FF0000] rounded-[5px] px-2.5 py-0.5"
            >
              <i class="far fa-thumbs-down"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                NÃO GOSTEI
              </span>
            </Link>
          </div>
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
