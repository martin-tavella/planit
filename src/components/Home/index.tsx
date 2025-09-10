"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "../../../public/img/logo/planit-only.png";
import SpaceBackground from "./utils/parallax"

const Home = () => {

    return (
    <main className="min-h-screen relative overflow-hidden">
     <SpaceBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src={logo.src}
                  alt="Planit Logo"
                  width={130}
                  height={130}
                  className="animate-pulse"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#a98af7]/20 to-[#c4b5fd]/20 rounded-full blur-xl" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#1d0c37] via-[#2a1548] to-[#a98af7] bg-clip-text text-transparent mb-6">
              Planit
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your cosmic productivity companion. Organize tasks, manage deadlines, and achieve your goals with an
              intuitive interface designed for modern teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-[#a98af7] to-[#c4b5fd] hover:from-[#9575cd] hover:to-[#b39ddb] text-white font-semibold px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-[#a98af7] text-[#a98af7] hover:bg-[#a98af7] hover:text-white px-8 py-3 text-lg bg-transparent"
                >
                  Enter Dashboard
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#1d0c37]">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1d0c37]">50K+</div>
                <div className="text-gray-600">Tasks Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1d0c37]">99%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#1d0c37] to-[#2a1548] rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a98af7]/10 to-[#c4b5fd]/10" />

              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">Ready to boost your productivity?</h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who have transformed their workflow with Planit.
                </p>

                <Link href="/register">
                  <Button className="bg-white text-[#1d0c37] hover:bg-gray-100 font-semibold px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300">
                    Start Your Journey
                    <Star className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      </main>
    )
};

export default Home;