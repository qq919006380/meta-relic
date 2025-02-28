'use client'
import { motion } from 'framer-motion';

interface TimelineEvent {
    year: number;
    month: number;
    day?: number;
    content: string;
}

interface TimelineProps {
    events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
    return (
        <div className="relative">
            {/* 中间的线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 
                          bg-gradient-to-b from-[rgb(139,69,19)] to-[rgb(184,115,51)]" />
            
            {events.map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                    {/* 时间点 */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <div className="inline-block bg-gradient-to-r from-[rgb(139,69,19)] to-[rgb(184,115,51)]
                                      text-[rgb(251,248,241)] px-4 py-2 rounded-lg shadow-lg">
                            {event.year}年{event.month}月{event.day ? `${event.day}日` : ''}
                        </div>
                    </div>
                    
                    {/* 圆点 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 
                                  bg-[rgb(255,215,0)] rounded-full border-4 border-[rgb(251,248,241)]" />
                    
                    {/* 内容 */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md
                                      border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                      transition-all duration-300">
                            {event.content}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline; 