// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Phone } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface FloatingCTAProps {
//   hotline?: string;
//   onRegisterClick: () => void;
// }

// export function FloatingCTA({ hotline, onRegisterClick }: FloatingCTAProps) {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       // Show CTA after scrolling 300px
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={cn(
//         "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden",
//         isVisible ? "translate-y-0" : "translate-y-full"
//       )}
//     >
//       <div className="bg-background border-t shadow-lg p-4">
//         <div className="flex items-center space-x-2 max-w-container mx-auto">
//           <Button 
//             variant="cta" 
//             className="flex-1"
//             onClick={onRegisterClick}
//           >
//             Register Now
//           </Button>
          
//           {hotline && (
//             <Button variant="outline" size="icon" asChild>
//               <a href={`tel:${hotline}`}>
//                 <Phone className="w-4 h-4" />
//               </a>
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
