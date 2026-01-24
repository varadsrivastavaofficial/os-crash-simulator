import Image from 'next/image';

export default function QRCode({ url }: { url: string }) {
  const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=104x104&data=`;
  return (
    <Image 
      src={`${qrApi}${encodeURIComponent(url)}`}
      alt="QR Code"
      width={104}
      height={104}
    />
  );
}
