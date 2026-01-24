import QRCode from '@/components/common/QRCode';

export default function WindowsBSOD() {
  const stopCode = "CRITICAL_PROCESS_DIED";
  const qrUrl = "https://www.windows.com/stopcode";

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0078d4] p-8 font-segoe text-white sm:p-20">
      <div className="w-full max-w-4xl">
        <p className="text-[120px] leading-none">:(</p>
        <p className="mt-8 text-2xl">
          Your PC ran into a problem and needs to restart. We're just
          collecting some error info, and then we'll restart for you.
        </p>

        <p className="mt-8 text-2xl">0% complete</p>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="h-28 w-28 bg-white p-1 flex items-center justify-center">
            <QRCode url={qrUrl} />
          </div>
          <div className="text-lg">
            <p>For more information about this issue and possible fixes, visit</p>
            <p>{qrUrl}</p>
            <p className="mt-4">If you call a support person, give them this info:</p>
            <p>Stop code: {stopCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
