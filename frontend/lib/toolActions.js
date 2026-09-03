import { copyText } from "./clipboard";
import { downloadFile } from "./download";

export async function handleCopy(text) {
  return await copyText(text);
}

export function handleDownload(content, filename, type) {
  downloadFile(content, filename, type);
}

export async function handleShare({ title, text, url }) {
  if (navigator.share) {
    await navigator.share({ title, text, url });
    return true;
  }

  return false;
}