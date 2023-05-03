import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const videoWidth: number = 500;
const videoHeight: number = 500;
const videoFrameRate: number = 5;

const constraints: MediaStreamConstraints = {
  audio: false,
  video: {
    width: videoWidth,
    height: videoHeight,
    frameRate: {
      max: videoFrameRate,
    },
    facingMode: {
      exact: "environment",
    },
  },
};

type QRCodeScannerProps = {
  setData: (data: string) => void;
};

export const QRCodeScanner = ({ setData }: QRCodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeData, setQrCodeData] = useState<string[]>([]);

  useEffect(() => {
    const openCamera = async () => {
      const video = videoRef.current;
      if (video) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
      }
    };
    openCamera();
  }, []);

  useEffect(() => {
    const decodeQRCode = () => {
      const context = canvasRef?.current?.getContext("2d");
      const video = videoRef?.current;

      if (!context || !video) {
        return;
      }

      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);

      const code = jsQR(imageData.data, videoWidth, videoHeight);
      return code?.data;
    };

    const intervalId = window.setInterval(() => {
      const decodedValue = decodeQRCode();
      if (!decodedValue || qrCodeData.includes(decodedValue)) {
        return;
      }

      setData(decodedValue);
    }, 1_000 / videoFrameRate);
    intervalRef.current = intervalId;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [qrCodeData, setData]);

  return (
    <div>
      <div className="grid">
        <div>
          <video autoPlay playsInline={true} ref={videoRef} className="w-full">
            <canvas width={videoWidth} height={videoHeight} ref={canvasRef} />
          </video>
        </div>
      </div>
    </div>
  );
};
