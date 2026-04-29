import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as ftp from "basic-ftp";
import dotenv from "dotenv";
import { Readable } from "stream";
import { config } from "../config/ftp";

dotenv.config();

export class ImageService {
  private readonly FTP_BASE_PATH = config.FTP_BASE_PATH;
  private readonly FTP_PUBLIC_URL = config.FTP_PUBLIC_URL;

  private async connectFTP() {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    await client.access({
      host: process.env.FTP_HOST!,
      user: process.env.FTP_USER!,
      password: process.env.FTP_PASSWORD!,
      secure: false, // Change to true if you're using FTPS
    });
    return client;
  }

  async saveImages(files: Express.Multer.File[]): Promise<string[]> {
    const savedImages: string[] = [];
    const client = await this.connectFTP();

    try {
      // Ensure the base directory exists or create it
      await client.ensureDir(this.FTP_BASE_PATH);

      for (const file of files) {
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExtension}`;
        const remotePath = `${this.FTP_BASE_PATH}/${fileName}`;

        // Upload the image
        await client.uploadFrom(Readable.from(file.buffer), remotePath);

        const publicUrl = `${this.FTP_PUBLIC_URL}/${fileName}`;
        savedImages.push(publicUrl);
      }
    } catch (error) {
      console.error("Error saving images:", error);
      throw new Error("Error saving images to FTP server");
    } finally {
      client.close();
    }
    return savedImages;
  }

  async removeImages(images: string[]): Promise<void> {
    const client = await this.connectFTP();

    for (const imageUrl of images) {
      try {
        const fileName = path.basename(imageUrl); // get just the filename
        const remotePath = `${this.FTP_BASE_PATH}/${fileName}`; // use correct FTP path

        await client.remove(remotePath);
      } catch (error) {
        console.warn(`Failed to remove image: ${imageUrl}`, error);
      }
    }

    client.close();
  }
}
