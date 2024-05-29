'use client';

import GitHub from '@/components/ui/GithHub';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { buttonVariants } from '@/components/ui/button';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AppScreen from './app.png';
import Image from 'next/image';

function Home() {

  return (
    <div className="h-screen bg-neutral-950">
      <main className='relative z-10 flex flex-col h-full items-center justify-center container w-full max-w-screen-lg'>
        <motion.h1 
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            GlycoGuard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: [0, 1] }}
          animate={{ opacity: 1, scale: [0.8, 1] }}
          transition={{ duration: 1, delay: 1 }}

          className='w-3/5 p-1.5 rounded-xl shadow-2xl bg-muted/40'
        >
          <Image priority src={AppScreen} alt='app screenshot' className="object-cover rounded-lg" />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className='text-neutral-400 text-md font-semibold max-w-prose text-center py-6'
        >
          Stay ahead of diabetes and other health risks with GlycoGuard. 
          Using advanced AI and personalized data, GlycoGuard provides 
          accurate health insights, empowering you to take proactive steps 
          towards a healthier future. Prevention starts with GlycoGuard.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }} 
          className='flex gap-4 items-center'
        >
          <Link href="https://github.com/aldotestino/hmi-xai-project" target='_blank' className={buttonVariants({ size: 'lg', variant: 'secondary' })}>
            <GitHub className='w-6 h-6 mr-2' />
            Support
          </Link>
          <Link href="/dashboard" className={buttonVariants({ size: 'lg' })}>
            <NotebookText className='w-6 h-6 mr-2' />
            Dashboard
          </Link>
        </motion.div>
      </main>
      <BackgroundBeams />
    </div>
  );
}

export default Home;