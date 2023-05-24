const fs = require("fs");
const { firebaseAdmin } = require("../db/conn");
const { format } = require("util");
const Multer = require("multer");
const { BUCKET_URL } = require("../config");
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const getProfilePhotoName = (userId, type) => {
  return `${userId}-avatar.ttttt`;
};
const getExtension = (filename) => filename.split(".").slice(-1)[0];

const uploadProfilePhotoMiddleware = Multer({
  storage: Multer.memoryStorage(),
  limit: MAX_IMAGE_SIZE,
}).single("avatar");

class FileStorage {
  constructor() {
    const storage = firebaseAdmin.storage();
    this.bucket = storage.bucket();
  }

  save(file, filename) {
    return new Promise((resolve, reject) => {
      const { bucket } = this;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          contentDisposition: "attachment",
          metadata: {
            originalBytes: file.size,
            extension: getExtension(file.originalname),
          },
        },
        resumable: false,
      });

      blobStream.on("error", (err) => {
        reject(err);
      });

      blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(`${BUCKET_URL}/${blob.name}`);
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  }

  async saveProfilePhoto(userId, file) {
    if (file.size > MAX_IMAGE_SIZE) throw new Error("Image is too big");
    return await this.save(file, getProfilePhotoName(userId));
  }

  async getProfilePhoto(userId, response) {
    try {
      const filename = getProfilePhotoName(userId);
      const file = this.bucket.file(filename);
      const metadata = await file.getMetadata();
      response.set({
        // 'Content-Disposition': `attachment; filename="${filename}.${metadata[0].metadata.extension}"`,
        "Content-Type": metadata[0].contentType,
      });
      file.createReadStream().pipe(response);
    } catch (err) {
      response.set("Content-Type", "image/png");
      fs.createReadStream(__dirname + "/../../public/img/noImg.png").pipe(
        response
      );
    }
  }
}

module.exports = {
  FileStorage,
  uploadProfilePhotoMiddleware,
};
