

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-py/90 *:transition-all">
      <div>
        <div className="text-[10px] text-white opacity-20">Tailfly ( do more write less )</div>
        <div className="*:w-80 *:h-40 *:rounded-[28px] *:shadow-xl flex gap-x-10 *:bg-primary p-20">
          <div className="light">
            <div className="text-xs text-gray-700 -translate-y-10 font-mono">light</div>
            <div className="text-[10px] px-4 opacity-30">bg-primary: <b>#fff</b></div>
            <p className="pt-10 text-center text-3xl font-bold text-brand">Brand</p>
            <div className="text-[10px] text-center opacity-20">text-brand: <b>skyblue</b></div>
          </div>
          <div className="dark">
            <div className="text-xs text-gray-700 -translate-y-10 font-mono">dark</div>
            <div className="text-[10px] px-4 opacity-30">bg-primary: <b>#0070f3</b></div>
            <p className="pt-10 text-center text-3xl font-bold text-brand">Brand</p>
            <div className="text-[10px] text-center opacity-20">text-brand: <b>pink</b></div>
          </div>
        </div>
      </div>

    </main>
  );
}
