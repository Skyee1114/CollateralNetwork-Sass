'use client'

import { ThirdwebProvider } from "thirdweb/react";
import { Layout } from "./_components/layout";
import withAuth from "../_components/withauth";
import { ReactNode } from "react";

interface DappLayoutProps {
  children: ReactNode;
}

const DappLayout: React.FC<DappLayoutProps> = ({ children }) => {
  return (
      <>
        <ThirdwebProvider>
          <Layout>{children}</Layout>
        </ThirdwebProvider>
      </>
  );
};

export default withAuth(DappLayout);
