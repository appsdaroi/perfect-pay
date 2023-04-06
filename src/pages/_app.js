import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { MoneyContextProvider } from "@/services/moneyContext";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <MoneyContextProvider>
        <Component {...pageProps} />
      </MoneyContextProvider>
    </SessionProvider>
  );
}
