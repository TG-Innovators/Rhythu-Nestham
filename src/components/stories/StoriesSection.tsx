import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { STORIES_DATA } from '../../lib/mockData';
import { SectionHeading } from '../common/SectionHeading';
import { EASINGS } from '../../lib/animations';

export const StoriesSection: React.FC = () => {
  return (
    <section id="stories" className="py-20 sm:py-28 bg-[#F8F5EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Agricultural Journal"
          title="Stories From the Soil."
          subtitle="Insights, ancestral crop wisdom, seasonal produce profiles, and field dispatches straight from our community of natural growers."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {STORIES_DATA.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: EASINGS.cinematic,
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#12372A]/10 shadow-sm hover:shadow-2xl hover:border-[#2E7D32]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between will-change-transform"
            >
              {/* Story Image with Zoom Reveal */}
              <div className="relative h-52 overflow-hidden bg-[#12372A]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#12372A] shadow-sm backdrop-blur-sm">
                    {story.category}
                  </span>
                </div>
              </div>

              {/* Story Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#66736A] mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {story.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {story.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#12372A] group-hover:text-[#2E7D32] transition-colors leading-snug line-clamp-2">
                    {story.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#66736A] leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>
                </div>

                {/* Read Link with animated arrow */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#66736A]">By {story.author}</span>
                  <span className="font-bold text-[#2E7D32] group-hover:text-[#12372A] transition-colors flex items-center gap-1 cursor-pointer">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
