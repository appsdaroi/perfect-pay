import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [profile, setProfile] = useState({});
  pageProps.profileState = [profile, setProfile];

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
