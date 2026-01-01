import type { FC } from "react";
import { ArrowRight, Upload } from "lucide-react";

interface HeroProps {
  onUploadClick?: () => void;
}

const Hero: FC<HeroProps> = ({ onUploadClick }) => {
  
  return (
    <section className="relative overflow-hidden min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
          📘 Your Study Companion
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Share Knowledge, <br />
          <span className="text-blue-600">Ace Your Exams</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Access thousands of high-quality notes shared by students worldwide.
          Upload your notes and help others succeed.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          
          <button
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white font-semibold shadow-lg transition hover:scale-[1.02]"
          >
            Browse Notes
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button
            onClick={onUploadClick}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            <Upload size={18} />
            Upload Your Notes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
