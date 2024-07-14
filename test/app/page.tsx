import Link from 'next/link';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-py/90 *:transition-all">

            <div>
                
            </div>

            <nav className='flex flex-col gap-y-6'>
                <Link href="/adding-colors">Adding colors</Link>
                <Link href="/define-property">Define Property</Link>
            </nav>
        </main>
    );
}
