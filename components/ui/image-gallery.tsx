"use client";mport { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
    
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>


      <section className="w-full flex flex-col items-center justify-start py-12">

        <div className="max-w-3xl text-center px-4">
          <h1 className="text-3xl font-semibold">Our Latest Creations</h1>
          <p className="text-sm text-slate-500 mt-2">
            A visual collection of our most recent works – each piece crafted
            with intention, emotion, and style.
          </p>
        </div>

        {/* Галерея снизу */}
        <div className="flex items-center gap-2 h-[400px] w-full max-w-5xl mt-10 px-4">
          {[
            "/assets/images/drive_photos/folder_1/PKP_-20.jpg",
            "/assets/images/drive_photos/folder_2/FS-104.jpg",
            "/assets/images/drive_photos/folder_3/PKP-16.jpg",
            "/assets/images/drive_photos/folder_4/FS-105.jpg",
            "/assets/images/drive_photos/folder_1/PKP_-25.jpg",
            "/assets/images/drive_photos/folder_2/FS-110.jpg",
          ].map((src, idx) => (
            <div
              key={idx}
              className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
            >
              <img
                className="h-full w-full object-cover object-center"
                src={src}
                alt={`image-${idx}`}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
