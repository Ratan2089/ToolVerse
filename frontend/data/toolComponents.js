import JsonFormatter from "@/components/tools/JsonFormatter";
import JwtDecoder from "@/components/tools/JwtDecoder";
import Base64Encoder from "@/components/tools/Base64Encoder";
import UuidGenerator from "@/components/tools/UuidGenerator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import TimestampConverter from "@/components/tools/TimestampConverter";
import UrlEncoder from "@/components/tools/UrlEncoder";
import HashGenerator from "@/components/tools/HashGenerator";
import WordCounter from "@/components/tools/WordCounter";
import CaseConverter from "@/components/tools/CaseConverter";

export const toolComponents = {
  "json-formatter": JsonFormatter,
  "jwt-decoder": JwtDecoder,
  "base64-encoder": Base64Encoder,
  "uuid-generator": UuidGenerator,
  "password-generator": PasswordGenerator,
  "timestamp-converter": TimestampConverter,
  "url-encoder": UrlEncoder,
  "hash-generator": HashGenerator,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
};

export function getToolComponent(slug) {
  return toolComponents[slug] || null;
}