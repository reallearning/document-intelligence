import { NextRequest, NextResponse } from "next/server";

const bucketName = "morrie-resources";
const folderPath = "demo/";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${folderPath}${file.name}`;

    // Initialize storage at runtime ↓
    const { Storage } = await import("@google-cloud/storage");
    const storage = new Storage({
      keyFilename: "config/klarity-demo.json",
      projectId: "questt-frida",
    });
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(fileName);

    await new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,
        metadata: {
          contentType: file.type,
        },
      });

      blobStream.on("error", (error) => {
        console.error("Upload error:", error);
        reject(error);
      });

      blobStream.on("finish", () => {
        resolve(true);
      });

      blobStream.end(buffer);
    });

    const [url] = await blob.getSignedUrl({
      action: "read",
      expires: Date.now() + 15 * 60 * 1000,
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      url: url,
    });
  } catch (error) {
    console.error("Error during file upload:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
