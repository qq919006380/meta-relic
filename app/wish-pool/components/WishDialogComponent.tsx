"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { STONE_DOGS } from '../../constants';

// 类型定义
interface StoneDog {
    id: string;
    name: string;
    description: string;
    modelId: string;
  }

export default function WishDialog(
    {
        isOpen,
        onOpenChange,
        selectedDog,
        onDogSelect,
        onWishChange,
        onNameChange,
        onSubmit
    }: {
        isOpen: boolean;
        onOpenChange: (open: boolean) => void;
        selectedDog: StoneDog;
        onDogSelect: (dog: StoneDog) => void;
        onWishChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onSubmit: () => void;
    }
) {
    // 使用useState来跟踪输入值，确保组件内部状态更新
    const [wishText, setWishText] = useState('');
    const [nameText, setNameText] = useState('');

    // 处理输入变化，同时更新本地状态和父组件状态
    const handleWishChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWishText(e.target.value);
        onWishChange(e);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameText(e.target.value);
        onNameChange(e);
    };

    // 处理提交，提交后重置表单
    const handleSubmit = () => {
        onSubmit();
        // 表单数据会在对话框关闭后重置
    };

    // 当对话框打开状态变化时，重置表单
    useEffect(() => {
        if (!isOpen) {
            // 对话框关闭时重置表单
            setWishText('');
            setNameText('');
        }
    }, [isOpen]);
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="bg-[#f5f0e6] border-[#8d765e]/30 rounded-xl max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-zhanku text-[#3a2b23]">
                            石狗许愿
                        </DialogTitle>
                        <DialogDescription className="text-[#5d4037]">
                            选择一位石狗守护者，写下您的心愿，投入许愿池。
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[#3a2b23]">您的名字（选填）</Label>
                            <Input
                                id="name"
                                value={nameText}
                                onChange={handleNameChange}
                                placeholder="匿名"
                                className="bg-white/80 border-[#8d765e]/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="wish" className="text-[#3a2b23]">您的愿望</Label>
                            <Textarea
                                id="wish"
                                value={wishText}
                                onChange={handleWishChange}
                                placeholder="写下您的心愿..."
                                className="min-h-[100px] bg-white/80 border-[#8d765e]/20"
                            />
                        </div>

                        <div className="pt-2">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 rounded-full bg-[#8B4513]"></div>
                                <span className="text-[#3a2b23] font-medium">当前守护者:</span>
                                <span className="text-[#3a2b23] pl-2 font-bold">{selectedDog.name}</span>
                            </div>
                        </div>

                        {/* 选择守护者 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {STONE_DOGS.map(dog => (
                                <div
                                    key={dog.id}
                                    onClick={() => onDogSelect(dog)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all
                          ${selectedDog.id === dog.id
                                            ? 'bg-[#8B4513] text-white'
                                            : 'bg-[#8B4513]/10 text-[#3a2b23] hover:bg-[#8B4513]/20'}`}
                                >
                                    <div className="font-medium">{dog.name}</div>
                                    <div className={`text-sm ${selectedDog.id === dog.id ? 'text-white/80' : 'text-[#5d4037]'}`}>
                                        {dog.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={!wishText.trim()} // 使用本地状态控制按钮禁用
                            className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
                        >
                            投入愿望
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}