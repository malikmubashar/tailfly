

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-py/90 *:transition-all">
      {/* border-box|dark & bg-#box/30 are quilent. | symbol is used for selecting color from other theme modes where # is used to select default mode color. */}
      <div className="size-36 absolute bg-#box/30 rounded-circle border-2 border-box|dark border-dashed -translate-x-40 -translate-y-5"></div>
      <h1 className="text-5xl font-bold text-clr z-10">
        <span className="text-brand">Hello,</span>
        Its Tailfly!
      </h1>
    </main>
  );
}
