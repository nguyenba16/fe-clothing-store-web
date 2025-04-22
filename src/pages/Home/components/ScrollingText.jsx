import { motion } from 'framer-motion';
import React from 'react';

const ScrollingText = () => {
    const messages = [
        "FREESHIP CHO ĐƠN HÀNG TỪ 500K",
        "GIẢM 20% CHO ĐƠN HÀNG ĐẦU TIÊN",
        "TẶNG QUÀ CHO THÀNH VIÊN MỚI",
        "ĐỔI TRẢ MIỄN PHÍ TRONG 30 NGÀY",
        "MUA 2 TẶNG 1"
    ];

    return (
        <div className="w-full overflow-hidden whitespace-nowrap">
            <div className="inline-block">
                <motion.div
                    className="flex"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear"
                        }
                    }}
                >
                    {messages.map((message, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center px-8">
                                <span className="text-xl font-medium">{message}</span>
                                <span className="mx-4">•</span>
                            </div>
                        </React.Fragment>
                    ))}
                    {messages.map((message, index) => (
                        <React.Fragment key={`repeat-${index}`}>
                            <div className="flex items-center px-8">
                                <span className="text-xl font-medium">{message}</span>
                                <span className="mx-4">•</span>
                            </div>
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollingText;