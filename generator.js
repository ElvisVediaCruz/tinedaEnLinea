import { generateKeyPairSync } from "crypto";
import fs from "fs";

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

// crear carpeta si no existe
if (!fs.existsSync("src/key")) {
  fs.mkdirSync("src/key", { recursive: true });
}

fs.writeFileSync("src/key/private.key", privateKey);
fs.writeFileSync("src/key/public.key", publicKey);

console.log("✅ Keys generadas en src/key/");