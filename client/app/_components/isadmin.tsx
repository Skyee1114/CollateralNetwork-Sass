'use client'

import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

const adminWallets = [
  "0x9948DAD58034646EC7f4D73Fbc7dBfD2F0077512",
  "0xd2897F7145D3BDc033Bf50c19b17Fb4D79F571f3",
  "0x0ECEE76BF2e99C18f2d77aA35a93fC3235aac293",
  "0x805B8e3C5Db9049Df85ED1D2fD70Dc71a94EF5a2",
  "0x140c2a0a3adc246f9fa42f8eccd144711b24ade9"
];

const IsAdmin = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const router = useRouter();
    const wallet = useActiveAccount();

    useEffect(() => {
      if (!wallet) {
        router.push("/"); // Redirect if wallet is not connected
      } else if (!adminWallets.includes(wallet.address)) {
        router.push("/"); // Redirect if connected wallet is not an admin
      }
    }, [wallet, router]);

    if (!wallet || !adminWallets.includes(wallet.address)) {
      return null; // Return null to prevent rendering the component before redirect
    }

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default IsAdmin;
