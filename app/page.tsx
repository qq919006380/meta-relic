import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          Meta Relic
        </h1>
        <p className="text-xl mb-12 text-gray-300">
          探索独特的 NFT 世界
        </p>
        
        <Link 
          href="/nft" 
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg 
                     font-semibold text-lg transition-all hover:bg-blue-700 
                     hover:scale-105 active:scale-95"
        >
          开始探索
        </Link>
      </main>

      <footer className="absolute bottom-8 text-gray-400">
        © 2024 Meta Relic. All rights reserved.
      </footer>
    </div>
  );
}
