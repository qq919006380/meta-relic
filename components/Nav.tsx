"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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

    const isCurrentPath = (href: string) => pathname === href;

    return <div>
        {showNav && (
            <nav className=" top-0 left-0 w-full bg-gradient-to-r from-museum-ink to-museum-ink/80 shadow-lg z-30">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 px-4">
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
                                    <span className={`text-lg font-medium transition-colors duration-200 whitespace-nowrap ${isCurrentPath(link.href) ? 'text-white' : 'text-gray-300 hover:text-white'
                                        }`}>
                                        {link.text}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-200 ${isCurrentPath(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}></span>
                                    </span>
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center px-4">
                            <Link href="/nft">
                                <Button
                                    variant="default"
                                    className="bg-museum-sand text-museum-ink hover:bg-museum-ink hover:text-museum-sand"
                                >
                                    专属定制
                                </Button>
                            </Link>
                        </div>

                        <div className="md:hidden pr-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="text-gray-300">
                                        <Menu className="h-8 w-8" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-museum-sand rounded-md shadow-lg mt-6">
                                    {navLinks.map((link) => (
                                        <DropdownMenuItem key={link.href} asChild>
                                            <Link href={link.href} className={`block px-6 py-3 text-base font-medium rounded-md whitespace-nowrap ${isCurrentPath(link.href)
                                                ? 'text-museum-sand bg-gradient-to-r from-museum-ink to-museum-ink/70'
                                                : 'hover:!text-museum-sand hover:bg-gradient-to-r hover:!from-museum-ink hover:!to-museum-ink/70'
                                            }`} onClick={() => setIsMenuOpen(false)}>
                                                {link.text}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </nav>
        )}
    </div>;
}
