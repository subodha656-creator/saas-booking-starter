'use client'
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Graphic Designer",
    address: "1234 Elm St, Springfield, IL",
    testimonial:
      "CalmClinic helped me book my first therapy session ever. The process was so easy, and the therapist was wonderful!",
  },
  {
    name: "James T.",
    role: "Software Engineer",
    address: "5678 Oak St, Springfield, IL",
    testimonial:
      "The scheduling system is seamless and flexible. I love how I can manage my appointments without any hassle.",
  },
  {
    name: "Emily R.",
    role: "Marketing Specialist",
    address: "9101 Pine St, Springfield, IL",
    testimonial:
      "Thanks to CalmClinic, I found a counselor who truly understands me. The online sessions fit perfectly into my busy life.",
  },
  {
    name: "Michael K.",
    role: "Entrepreneur",
    address: "1122 Maple St, Springfield, IL",
    testimonial:
      "I appreciate the professionalism and the easy payment options. This platform makes wellness accessible for everyone.",
  },
  {
    name: "Olivia S.",
    role: "Student",
    address: "3344 Birch St, Springfield, IL",
    testimonial:
      "Booking therapy online felt intimidating at first, but CalmClinic made it so simple and welcoming.",
  },
  {
    name: "David L.",
    role: "Teacher",
    address: "5566 Cedar St, Springfield, IL",
    testimonial:
      "The dashboard insights really helped me track my progress and stay motivated throughout my journey.",
  },
];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function Testimonials() {
    const [chunk, setChunk] = useState(3);
  const groupedTestimonials = chunkArray(testimonials, chunk);

  useEffect(()=>{
    const event = () => {
        let innerWidth = window.innerWidth;
        if(innerWidth < 640){
            setChunk(1);
        }
        else if(innerWidth < 760){
            setChunk(2);
        }
        else{
            setChunk(3);
        }
    };
    window.addEventListener('resize', event);
    return () => {
      window.removeEventListener('resize', event);
    }
  }, [])

  return (
    <section className="px-2 sm:px-4 lg:px-6 py-16 flex justify-center items-center bg-calm-primary/50 flex-col">
      <Button className="bg-calm-primary shadow-lg text-white hover:text-white">
        Testimonials
      </Button>

      <h2 className="text-2xl text-white font-bold text-center mb-8 mt-8">
        What Our Users Say
      </h2>

      <div className="max-w-[1320px] w-full lg:px-12">
        <Carousel className="max-w-full ">
          <CarouselContent className="-ml-1">
            {groupedTestimonials.map((group, index) => (
              <CarouselItem key={index} className="pl-1 ">
                <div className="flex gap-6 justify-center">
                  {group.map((testimonial, i) => (
                    <Card key={i} className="flex-1 min-w-[380px] h-[400px] sm:h-[400px] bg-calm-tertiary shadow-xl">
                      <CardContent className="flex flex-col p-6">
                        <p className="mb-4 text-white italic mt-6">
                          "{testimonial.testimonial}"
                        </p>
                        <div className="mt-12">

                            <img
                                src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=random&size=128`}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full mb-2"
                            />
                        </div>
                        <div>
<div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-white">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-white mt-1">
                          {testimonial.address}
                        </div>
                        </div>
                        
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
