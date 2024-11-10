import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import AdminNav from "../Admin/AdminNav";
import { XSquare } from "lucide-react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";

async function fetchFileData(fileId: string): Promise<DocumentData | undefined> {
  const fileRef = doc(db, "files", fileId);
  const fileDocSnap = await getDoc(fileRef);
  const fileDoc = fileDocSnap.data();
  return fileDoc as DocumentData | undefined;
}

function PdfViewer() {
  const { fileId } = useParams<{ fileId: string }>();
  const [fileDoc, setFileDoc] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fileId) {
          const data = await fetchFileData(fileId);
          setFileDoc(data || null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [fileId]);

  const url = fileDoc?.url || "default-url";

  const transformToolbarSlot = (slot: any) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    OpenFile: () => <></>,
    ShowProperties: () => <></>,
    Open: () => <></>,
  });

  const renderToolbar = (Toolbar: React.ComponentType<any>) => (
    <Toolbar>{renderDefaultToolbar(transformToolbarSlot)}</Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;

  return (
    <>
      <div className="w-screen h-screen">
        <AdminNav toggleDelete={() => {}} handleUpload={() => {}} />
        <div className="relative h-full w-screen mt-16">
          <button
            onClick={() => window.close()}
            className="px-4 py-1 absolute bg-transparent z-[1000] md:top-1 md:right-28 top-1 right-8 w-fit h-fit rounded-none"
          >
            <XSquare strokeWidth={1} className="text-blue-500" />
          </button>
          <div className="w-screen h-full absolute top-0 right-0 z-50 print:hidden px-2 select-none ">
            <Worker
              workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={url}
                plugins={[defaultLayoutPluginInstance]}
                defaultScale={1}
              />
            </Worker>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfViewer;
