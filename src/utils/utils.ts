import fs from 'fs';
import * as path from 'path';
import { InvalidImage } from '../middlewares/errors/InvalidImage';

export async function saveBase64ImageToLocalFolder(base64Image: string, filename: string, userId: string, folder: string) {
  const matches = base64Image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    throw new InvalidImage()
  }

  const type = matches[1];
  const data = Buffer.from(matches[2], 'base64');

  const directory = path.join(process.cwd(), 'dist', 'images', userId, folder);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  const url = `/images/${userId}/${folder}/${filename}.${type}`

  try {
    await fs.promises.writeFile(`${directory}/${filename}.${type}`, data)
    return url
  } catch (err) {
    console.error(err)
    throw new InvalidImage()
  }
}
