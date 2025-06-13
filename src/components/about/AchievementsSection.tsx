import React from 'react';

export default function AchievementsSection() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Our Achievements
        </h2>
        
        <p className="text-gray-300 mb-12 max-w-3xl text-lg">
          At Terra Legacy, we take pride in our accomplishments and the recognition we have received for our commitment to excellence in the real estate industry.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AchievementCard 
            title="10 Years of Excellence"
            description="A decade of providing exceptional real estate services and building lasting relationships with our valued clients."
          />
          
          <AchievementCard 
            title="Happy Clients"
            description="Over 1,000 satisfied clients who have found their dream properties through our dedicated service."
          />
          
          <AchievementCard 
            title="Industry Recognition"
            description="Multiple awards for our innovative approach to real estate and commitment to client satisfaction."
          />
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-charcoal bg-opacity-50 p-8 rounded-lg border border-gray-800 hover:border-burgundy transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
