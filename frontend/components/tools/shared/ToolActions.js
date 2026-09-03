"use client";

import CopyButton from "./CopyButton";
import DownloadButton from "./DownloadButton";
import ShareButton from "./ShareButton";
import ResetButton from "./ResetButton";

export default function ToolActions({
  supports,
  onCopy,
  onDownload,
  onShare,
  onReset,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {supports?.copy && <CopyButton onClick={onCopy} />}
      {supports?.download && <DownloadButton onClick={onDownload} />}
      {supports?.share && <ShareButton onClick={onShare} />}
      {supports?.reset && <ResetButton onClick={onReset} />}
    </div>
  );
}