// utils/exportZip.ts
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function exportProjectZip(
  files: Record<string, { display: string; preview?: string }>,
  projectName: string
) {
  const zip = new JSZip();

  Object.entries(files).forEach(([filename, file]) => {
    zip.file(filename, file.display); // Use display content only
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${projectName}.zip`);
}
