

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-py/90 *:transition-all">
      <div>
        <div className="text-[10px] text-white opacity-20">Tailfly ( do more write less )</div>
        <div className="*:size-40 *:border-borderW *:border-yellow-500 *:rounded-circle *:shadow-xl flex gap-x-10 *:bg-primary *:flex *:justify-center *:items-center *:flex-col p-20">
          <div className="light">
            <div className="text-xs text-gray-700 -translate-y-24 font-mono">light</div>
            <div className="text-[10px] px-4 opacity-30 text-nowrap">rounded-circle: <b>4rem</b></div>
            <div className="text-[10px] px-4 opacity-30 text-nowrap">border-borderW: <b>2px</b></div>
          </div>
          <div className="dark ">
            <div className="text-xs text-gray-700 -translate-y-24 font-mono">dark</div>
            <div className="text-[10px] px-4 opacity-30 text-nowrap">rounded-circle: <b>6rem</b></div>
            <div className="text-[10px] px-4 opacity-30 text-nowrap">border-borderW: <b>2px</b></div>
          </div>
        </div>
      </div>

    </main>
  );
}
