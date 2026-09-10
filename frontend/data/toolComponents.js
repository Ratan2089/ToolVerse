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
import RegexTester from "@/components/tools/RegexTester";
import JsonToCsv from "@/components/tools/JsonToCsv";
import XmlFormatter from "@/components/tools/XmlFormatter";
import YamlFormatter from "@/components/tools/YamlFormatter";
import JsonYamlConverter from "@/components/tools/JsonYamlConverter";
import CsvToJson from "@/components/tools/CsvToJson";
import SqlFormatter from "@/components/tools/SqlFormatter";
import UrlParser from "@/components/tools/UrlParser";
import JsonDiff from "@/components/tools/JsonDiff";
import TextDiff from "@/components/tools/TextDiff";
import CronGenerator from "@/components/tools/CronGenerator";
import HttpStatusChecker from "@/components/tools/HttpStatusChecker";
import IpCalculator from "@/components/tools/IpCalculator";
import ColorConverter from "@/components/tools/ColorConverter";
import MarkdownFormatter from "@/components/tools/MarkdownFormatter";

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
  "regex-tester": RegexTester,
  "json-to-csv": JsonToCsv,
  "xml-formatter": XmlFormatter,
  "yaml-formatter": YamlFormatter,
  "json-yaml-converter": JsonYamlConverter,
  "csv-to-json": CsvToJson,
  "sql-formatter": SqlFormatter,
  "url-parser": UrlParser,
  "json-diff": JsonDiff,
  "text-diff": TextDiff,
  "cron-generator": CronGenerator,
  "http-status-checker": HttpStatusChecker,
  "ip-calculator": IpCalculator,
  "color-converter": ColorConverter,
  "markdown-formatter": MarkdownFormatter,
};

export function getToolComponent(slug) {
  return toolComponents[slug] || null;
}
