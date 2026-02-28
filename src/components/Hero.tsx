'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/30 -z-10">
      <Image
          src="/food.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={400}
              height={400}
              className="w-48 h-48 mx-auto lg:mx-0 shadow-lg"
            />
            <span className="text-amber-300"></span> Royal India Cuisine
          </h1>
          <p className="text-lg leading-6 text-gray-200 mb-6 drop-shadow-md">
            Experience the bold, fiery flavors of Chettinad cuisine crafted with age-old recipes and authentic spices.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button 
              onClick={()=>router.push('/menus')}
              className="inline-flex h-12 w-32 text-1xl animate-shimmer items-center justify-center rounded-md border border-pink-500 bg-[linear-gradient(110deg,#fd1d1d,30%,#f56040,50%,#fcaf45,70%,#bc2a8d)] bg-[length:200%_100%] px-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-white">Place order</button>
            {/* <a
              onClick={()=>router.push('/menus')}
              className="bg-yellow-200 font-semibold text-black shadow-lg text-1xl px-8 py-3 rounded-full font-medium hover:bg-yellow-700 transition-colors"
            >
              Order now
            </a> */}
          </motion.div>
        </motion.div>

      {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative none"
        >
          <div className="relative w-full max-w-lg mx-auto opacity-25">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative">
              <Image
                src="/tech-circuit.svg"
                alt="Technology Circuit"
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;