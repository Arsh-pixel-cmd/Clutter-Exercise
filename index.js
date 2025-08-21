import fs from "fs/promises";
import path from "path";

const basePath = 
"";

try {
  const files = await fs.readdir(basePath);

  for (const item of files) {
    const ext = item.split(".").pop();

    // Skip JS and JSON files
    if (ext === "js" || ext === "json" || !item.includes(".")) continue;

    const folderPath = path.join(basePath, ext);
    const oldPath = path.join(basePath, item);
    const newPath = path.join(folderPath, item);

    try {
      // Ensure the folder exists
      await fs.mkdir(folderPath, { recursive: true });

      // Move file
      await fs.rename(oldPath, newPath);
      console.log(`Moved ${item} -> ${folderPath}`);
    } catch (err) {
      console.error(`Error moving ${item}:`, err.message);
    }
  }
} catch (err) {
  console.error("Error reading directory:", err.message);
}
