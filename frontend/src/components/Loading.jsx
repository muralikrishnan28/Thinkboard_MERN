import { motion } from 'framer-motion'

export default function Loading() {
    const baseStyle = {
        width: 20,
        height: 20,
        borderRadius: "50%",
        position: "absolute"
    };

    return (
        <div className="vh-90 d-flex flex-column align-items-center justify-content-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "linear"
                }}
                exit={{ opacity:0, y:50, transition:{ duration: 0.5}}}
                style={{
                    boxShadow: "2px 3px red",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    position: "relative"
                }}
            >
                {/* Dot 1 - top */}
                <div style={{ ...baseStyle, background: "tomato", left: "50%", transform: "translateX(-50%)" }} />
                
                {/* Dot 2 - bottom */}
                <div style={{ ...baseStyle, background: "skyblue", bottom: 0, left: "50%", transform: "translateX(-50%)"  }} />
                
                {/* Dot 3 - left */}
                <div style={{ ...baseStyle, background: "limegreen", top: "50%", left: 0, transform: "translateY(-50%)" }} />
                
                {/* Dot 4 - right */}
                <div style={{ ...baseStyle, background: "gold", top: "50%", right: 0, transform: "translateY(-50%)" }} />
            </motion.div>
            <p className="display-6 text-white mt-4 font-monospace">Loading...</p>
        </div>
    )
}
