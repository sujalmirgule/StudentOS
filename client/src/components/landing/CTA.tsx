import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#09090B] py-28">
      <div className="mx-auto max-w-6xl px-6">

        <div className="rounded-[40px] border border-orange-500/20 bg-gradient-to-r from-orange-500 to-amber-500 p-16 text-center">

          <h2 className="text-5xl font-black text-white">
            Ready to Upgrade
            <br />
            Your Student Life?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-orange-100">
            Join thousands of students using StudentOS to stay
            productive, organized and ahead in college.
          </p>

          <button className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-orange-600 transition hover:scale-105">
            Get Started
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}