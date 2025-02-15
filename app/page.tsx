import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-museum-slate to-museum-ink text-museum-cream">
      <main className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          Meta Relic
        </h1>
        <p className="text-xl mb-12 text-museum-sand">
          探索独特的 NFT 世界
        </p>
        
        <Link 
          href="/nft" 
          className="inline-block px-8 py-4 bg-museum-stone text-museum-cream rounded-lg 
                     font-semibold text-lg transition-all hover:bg-museum-slate 
                     hover:scale-105 active:scale-95"
        >
          开始探索
        </Link>
      </main>

      <footer className="absolute bottom-8 text-museum-sand">
        © 2024 Meta Relic. All rights reserved.
      </footer>
    </div>
  );
}
