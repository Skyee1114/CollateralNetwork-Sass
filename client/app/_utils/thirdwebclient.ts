import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
  // secretKey: "PAay0-h8Y7RtPwD8rKhh4wXxamlHLMsochxMjYPhxmsbApHGnsSklr4CAI6BiUu64hon5Tq1D0vO9VZ1LTH4pQ",
});
