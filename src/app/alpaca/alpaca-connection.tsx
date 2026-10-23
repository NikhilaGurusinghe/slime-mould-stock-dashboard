import { Alpaca } from "@alpacahq/alpaca-trade-api";

const alpacaKeyId: string | undefined = process.env.APCA_API_KEY_ID;
if (!alpacaKeyId) throw new Error("APCA_API_KEY_ID is not set");

const alpacaSecret: string | undefined = process.env.APCA_API_SECRET_KEY;
if (!alpacaSecret) throw new Error("APCA_API_SECRET_KEY is not set");

const alpacaPaper: Alpaca = new Alpaca({ keyId: alpacaKeyId, secret: alpacaSecret, paper: true });

export default alpacaPaper;