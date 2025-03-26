import { motion } from "framer-motion";

const IsTyping = ({ selectedUserNickname }: { selectedUserNickname: string }) => {
    console.log("selectedUserNickname", selectedUserNickname);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 text-sub-600 text-sm bg-white/50 p-2 rounded-lg"
        >
            <span>{selectedUserNickname || "Unknown"}</span>
            <div className="flex gap-1">
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    is
                </motion.span>
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                    typing
                </motion.span>
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                    ...
                </motion.span>
            </div>
        </motion.div>
    )
}

export default IsTyping;