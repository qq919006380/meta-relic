"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Nav() {
    const pathname = usePathname();   // 获取当前路径
    const showNav = !pathname.startsWith('/nft'); // 如果路径以 '/nft' 开头，则不显示导航栏
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/origin', text: '石狗信仰起源' },
        { href: '/making', text: '石狗雕制起始' },
        { href: '/distribution', text: '石狗分布及置放' },
        { href: '/protection', text: '雷州石狗保护' },
    ];

    return <div>
        {showNav && (
            <nav className=" top-0 left-0 w-full bg-gradient-to-r from-museum-ink to-museum-ink/80 shadow-lg z-30">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    src="/logo.png"
                                    alt="Meta Relic Logo"
                                    width={150}
                                    height={87}
                                    className="hover:opacity-90 transition-opacity"
                                />
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} className="group relative flex items-center">
                                    <span className="text-gray-300 text-lg font-medium hover:text-white transition-colors duration-200 whitespace-nowrap">
                                        {link.text}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                                    </span>
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center">
                            <Link href="/nft">
                                <Button 
                                    variant="default" 
                                    className="bg-museum-sand text-museum-ink hover:bg-museum-ink hover:text-museum-sand"
                                >
                                    进入 NFT
                                </Button>
                            </Link>
                        </div>

                        <div className="md:hidden">
                            <button 
                                className="text-gray-300 hover:text-white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md whitespace-nowrap"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        )}
    </div>;
}
