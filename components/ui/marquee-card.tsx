import { useState } from "react"
import { Star, X } from "lucide-react"

import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card"
import { Marquee } from "@/components/ui/marquee"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content:
      "This component library has transformed our development workflow. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Frontend Developer",
    content:
      "Clean, modern, and incredibly easy to use. Perfect for our React projects.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "UI Designer",
    content:
      "The design system is consistent and beautiful. Love the attention to detail.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Alex Rodriguez",
    role: "Tech Lead",
    content:
      "Excellent documentation and great community support. A must-have toolkit.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
    rating: 5,
  },
]

export const Component = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null)

  return (
    <div className="relative w-full py-12">
      <Marquee pauseOnHover className="py-4">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedTestimonial(testimonial)}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <LiquidCard className="mx-2 rounded-3xl w-80 h-full">
              <CardContent className="p-6 py-4">
                <div className="mb-4 flex items-center space-x-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-10 w-10 object-cover rounded-full border border-primary/20"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-primary/60">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mb-3 text-foreground/80 line-clamp-3 text-sm">{testimonial.content}</p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#fff200] text-[#fff200]"
                    />
                  ))}
                </div>
              </CardContent>
            </LiquidCard>
          </div>
        ))}
      </Marquee>

      {/* Modal Popup Frame */}
      {selectedTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300">
          <div 
            style={{ backdropFilter: 'url("#container-glass")' }}
            className="relative w-full max-w-md mx-4 p-8 rounded-3xl bg-background/30 border border-primary/20 shadow-2xl text-foreground"
          >
            <button 
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <img
                src={selectedTestimonial.avatar}
                alt={selectedTestimonial.name}
                className="h-24 w-24 object-cover rounded-full border-2 border-primary/20 shadow-lg mb-4"
              />
              <h3 className="text-2xl font-bold font-serif mb-1">{selectedTestimonial.name}</h3>
              <p className="text-sm text-primary/60 mb-4 font-mono">{selectedTestimonial.role}</p>
              
              <div className="flex space-x-1 mb-6">
                {[...Array(selectedTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#fff200] text-[#fff200]"
                  />
                ))}
              </div>

              <p className="text-base leading-relaxed text-foreground/90 italic">
                "{selectedTestimonial.content}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
