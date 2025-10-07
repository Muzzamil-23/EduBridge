import React from "react";
import FallingChits from "./reactbits/TextAnimations/FallingText/FallingText";
import FallingText from "./reactbits/TextAnimations/FallingText/FallingText";


const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Tagline */}
      <span className="text-sm bg-[#d0f9e4] border border-[#aef9d2] px-4 py-2 rounded-full mb-5 text-[var(--muted)] shadow-card">
        🎓 Smarter guidance for your university journey
      </span>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl md:leading-16 font-bold max-w-3xl leading-tight">
        A platform that helps you{" "}
        <span className="gradient-text">choose smarter</span>, not just{" "}
        <span className="gradient-text">apply faster</span>.
      </h1>

      {/* Description */}
      <p className="mt-6 text-lg max-w-2xl text-[var(--secondary)]">
        Discover your best-fit university through AI-powered analysis, personalized
        recommendations, and real-time admission insights.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4 mb-20">
        <button className="btn-primary">Find My Match</button>
        <button className="btn-outline">Learn More</button>
      </div>

      {/* <div className="absolute bottom-10 flex flex-wrap justify-center gap-3 opacity-90 max-w-4xl mx-auto">
        {[
          { label: "AI Recommendations", color: "hsl(var(--neon-lime))" },
          { label: "Real-Time Insights", color: "hsl(var(--neon-cyan))" },
          { label: "Smart Filtering", color: "hsl(var(--neon-purple))" },
          { label: "Application Feedback", color: "hsl(var(--neon-pink))" },
          { label: "Program Comparison", color: "hsl(var(--neon-orange))" },
          { label: "University Clusters", color: "hsl(var(--neon-lime))" },
          { label: "Match Scoring", color: "hsl(var(--neon-purple))" },
          { label: "Admission Trends", color: "hsl(var(--neon-orange))" },
        ].map((tag, i) => (
          <span
            key={i}
            className="text-sm px-5 py-3 rounded-full border backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-md"
            style={{
              backgroundColor: `${tag.color}`,
              borderColor: `${tag.color}`,
              boxShadow: `0 0 12px ${tag.color}`,
            }}
          >
            {tag.label}
          </span>
        ))}
      </div> */}


      {/* <section className="absolute bottom-10 flex flex-wrap justify-center gap-3 opacity-90 max-w-4xl mx-auto">
        <FallingChits
          features={[
            "AI Recommendations",
            "Smart Filtering",
            "Real-Time Insights",
            "Program Comparison",
            "University Clusters",
            "Match Scoring",
            "Admission Trends",
          ]}
        />
      </section> */}




      {/* <div className="absolute top-0 left-0 w-full h-full">
        <FallingText
          text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
          highlightWords={["React", "Bits", "animated", "components", "simplify"]}
          highlightClass="highlighted"
          trigger="auto"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.3}             // slow fall
          fontSize="1.5rem"
          mouseConstraintStiffness={0.8}
        />
      </div> */}

      <div className="absolute top-0 left-0 w-full h-full">
        <FallingText
          text={`AI-powered university match smart filtering real-time admission insights program comparison match scoring admission trends`}
          highlightWords={[
            "AI-powered",
            "university",
            "match",
            "smart",
            "filtering",
            "real-time", 
            "admission" ,
            "insights",
            "program", 
            "comparison",
            "match", 
            "scoring",
            "admission", 
            "trends"
          ]}
          highlightClass="highlighted"
          trigger="auto"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.25}           // slower, smooth fall
          fontSize="1.5rem"           // big
          mouseConstraintStiffness={0.8}
        />
      </div>










    </section>
  );
};

export default HeroSection;
