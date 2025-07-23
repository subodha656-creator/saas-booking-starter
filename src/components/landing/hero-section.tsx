import { Button } from "../ui/button";

export default function HeroSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(90deg, #93c5fd 0%, #6ee7b7 50%, #fde68a 100%)',
      }}
    >
      <div className="absolute top-0 left-0 w-full z-50 px-2 sm:px-4 mb-6 md:mb-0">
        {children}
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 max-w-4xl mx-auto drop-shadow-lg leading-tight">
          Find Your Calm. Book Trusted Therapy Sessions in Minutes.
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-md leading-relaxed">
          CalmClinic connects you with certified therapists, counselors, and wellness experts — all in one simple platform. Choose a plan, book a session, and take control of your mental wellness today.
        </p>


        {/* desktop cards */}





        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Button className="w-full sm:w-auto bg-white text-blue-600 font-bold py-4 sm:py-5 md:py-6 px-6 sm:px-7 md:px-8 text-base sm:text-lg rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
            Get Started
          </Button>
          <Button className="w-full sm:w-auto border-2 border-white text-white font-semibold py-4 sm:py-5 md:py-6 px-6 sm:px-7 md:px-8 text-base sm:text-lg rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 bg-transparent">
            Explore Services
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce md:hidden">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}