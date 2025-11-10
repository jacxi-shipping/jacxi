'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-brand-navy text-brand-white overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-20 lg:py-32 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-2xl z-30"
          >
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight text-brand-white">
                Government-Certified Car Shipping from USA to UAE
              </h1>
              <p className="text-base md:text-lg lg:text-[20px] text-brand-gray leading-relaxed">
                Secure, insured, white-glove service for high-value vehicles
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-brand-gold text-brand-white hover:bg-brand-gold/90 px-8"
              >
                Get Quote
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-brand-white text-brand-navy border-2 border-brand-white hover:bg-brand-light-gray px-8"
              >
                Our Services
              </Button>
            </div>
          </motion.div>

          {/* Right Side - Image with Overlay and Patterns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidd0en bg-brand-navy"
          >
            {/* Hero Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg"
                alt="Bentley SUV being loaded into shipping container"
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                unoptimized
              />
            </div>

            {/* Geometric Grid Pattern - Background Layer */}
            <div className="absolute inset-0 opacity-5 z-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F8F9FA" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Royal Navy Gradient Overlay (Left to Right, 10-15% opacity) */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/15 via-brand-navy/10 to-transparent z-20 pointer-events-none"></div>

            {/* Emirati Corner Pattern - Top Right */}
            <div className="absolute top-0 right-0 w-32 h-32 z-30 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 128 128" preserveAspectRatio="none">
                <defs>
                  <pattern id="emirati-corner" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 0 0 L 32 0 L 32 8 L 8 8 L 8 32 L 0 32 Z" fill="#D4AF37" />
                    <path d="M 8 8 L 24 8 L 24 16 L 16 16 L 16 24 L 8 24 Z" fill="#D4AF37" />
                  </pattern>
                </defs>
                <rect width="128" height="128" fill="url(#emirati-corner)" />
              </svg>
            </div>

            {/* Emirati Corner Pattern - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-32 h-32 z-30 opacity-20 rotate-180">
              <svg className="w-full h-full" viewBox="0 0 128 128" preserveAspectRatio="none">
                <defs>
                  <pattern id="emirati-corner-bottom" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 0 0 L 32 0 L 32 8 L 8 8 L 8 32 L 0 32 Z" fill="#D4AF37" />
                    <path d="M 8 8 L 24 8 L 24 16 L 16 16 L 16 24 L 8 24 Z" fill="#D4AF37" />
                  </pattern>
                </defs>
                <rect width="128" height="128" fill="url(#emirati-corner-bottom)" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}