"use client";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR('http://127.0.0.1:8000/current_track', fetcher);
  const track = data || { title: '', artist: '' };
  const isLoading = !error && !data;
  if (error) {
    console.error('Ошибка получения данных:', error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: 'linear-gradient(108deg, rgba(85, 102, 221, 0.84) 0%, rgba(140, 134, 198, 0.90) 50%, rgba(90, 160, 152, 0.90) 100%)' }}>
      <div className="flex flex-col items-center">
        <div className="w-[400px] p-8 text-center rounded-lg border border-[#9BA3D6] bg-white/50 shadow-[0_0_26px_0_rgba(0,0,0,0.3)]">
          <p className="mb-8 font-mono text-black">
            сейчас играет у меня в Я.Музыке: <b>{track.title}</b> - <b>{track.artist}</b>
          </p>

          <pre className="mb-4 font-mono text-black text-2xl">
            {`/\\_/\\
( o.o )
> ^ <`}
          </pre>

          <h1 className="mb-2 font-mono text-black text-2xl">xdearboy</h1>
          <h1 className="mb-8 font-mono text-black">programmer, designer, and just a chill guy</h1>

          <nav className="font-mono text-black">
            <a href="https://github.com/xdearboy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">[github]</a>
            <span className="mx-2">|</span>
            <a href="https://t.me/contactfiuimwix_bot" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">[telegram]</a>
            <span className="mx-2">|</span>
            <a href="https://github.com/xdearboy/pterodactyl-crasher" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">[ptero-crasher]</a>
            <span className="mx-2">|</span>
            <span className="underline cursor-pointer" onClick={() => {
              navigator.clipboard.writeText('feeeeelbaaaaad');
              alert('Юзернейм скопирован!');
            }}>[discord]</span>
            <span className="mx-2">|</span>
            <a href="https://t.me/vroffteam" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">[blog]</a>
          </nav>
        </div>

        <div className="mt-4 rounded-[var(--Corner-Extra-large,28px)] border-2 border-black bg-[var(--Miscellaneous-Floating-Tab---Pill-Fill,#FFF)] px-4 py-1 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]">
          <p className="font-mono text-sm text-black">Made by xdearboy</p>
        </div>
      </div>
    </div>
  )
}

