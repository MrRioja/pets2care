import Image from "../models/Image";
import { resolve } from "path";
import fs from "fs";

export default function deleteImages(images: Image[]) {
  images.forEach((image) => {
    const path = resolve(__dirname, "..", "..", "uploads", `${image.path}`);
    fs.rm(path, (err) => {
      if (err) throw err;
    });
  });
}

export function deleteAvatar(avatar: string) {
  const path = resolve(__dirname, "..", "..", "uploads", `${avatar}`);
  fs.rm(path, (err) => {
    if (err) throw err;
  });
}
