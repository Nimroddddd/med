import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageTransition = ({ children }) => {

  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const animationFrame = requestAnimationFrame(() => {
      setShowContent(true)
    })
    
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {showContent && children}
    </motion.div>
  );
};

export default PageTransition; 