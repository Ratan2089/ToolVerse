export function downloadFile(
  content,
  filename,
  type = "text/plain"
) {
  const blob = new Blob(
    [content],
    {
      type,
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = filename;

  a.style.display = "none";

  document.body.appendChild(a);

  a.click();

  a.remove();

  // Give the browser a chance to start the download
  // before releasing the object URL.
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}