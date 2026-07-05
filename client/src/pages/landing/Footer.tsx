import {
  GraduationCap,
  Mail,
} from "lucide-react";



export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black py-20 px-6 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        <div className="grid gap-16 md:grid-cols-4">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-2">

              <GraduationCap className="h-7 w-7 text-orange-500" />

              <span className="text-2xl font-bold text-white">
                StudentOS
              </span>

            </div>

            <p className="mt-6 text-zinc-400 leading-7">

              The AI-powered operating system
              built for modern students.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 font-semibold text-white">
              Product
            </h3>

            <div className="space-y-3 text-zinc-400">

              <p className="hover:text-white cursor-pointer">
                Dashboard
              </p>

              <p className="hover:text-white cursor-pointer">
                AI Assistant
              </p>

              <p className="hover:text-white cursor-pointer">
                Placements
              </p>

              <p className="hover:text-white cursor-pointer">
                Coding
              </p>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-5 font-semibold text-white">
              Company
            </h3>

            <div className="space-y-3 text-zinc-400">

              <p className="hover:text-white cursor-pointer">
                About
              </p>

              <p className="hover:text-white cursor-pointer">
                Careers
              </p>

              <p className="hover:text-white cursor-pointer">
                Blog
              </p>

              <p className="hover:text-white cursor-pointer">
                Contact
              </p>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-5 font-semibold text-white">
              Connect
            </h3>

            <div className="flex gap-4">

              

              <div className="rounded-xl border border-white/10 bg-zinc-900 p-3 hover:border-orange-500 transition">
                <Mail className="h-5 w-5 text-white" />
              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-zinc-500">

            © 2026 StudentOS. All rights reserved.

          </p>

          <div className="mt-4 flex gap-8 md:mt-0 text-zinc-500">

            <span className="hover:text-white cursor-pointer">
              Privacy
            </span>

            <span className="hover:text-white cursor-pointer">
              Terms
            </span>

            <span className="hover:text-white cursor-pointer">
              Cookies
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}