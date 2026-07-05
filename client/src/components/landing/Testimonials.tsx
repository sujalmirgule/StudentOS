import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Patil",
    role: "Computer Engineering",
    review:
      "StudentOS replaced 5 different apps I used every day. Everything is finally in one place.",
  },
  {
    name: "Priya Sharma",
    role: "Information Technology",
    review:
      "The AI Notes and Planner helped me organize my semester much better.",
  },
  {
    name: "Aditya More",
    role: "B.Tech Student",
    review:
      "Looks and feels like a real startup product. Clean, modern and incredibly useful.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#09090B] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
            Testimonials
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            Loved by Students
          </h2>

          <p className="mt-5 text-lg text-zinc-400">
            Thousands of students trust StudentOS every day.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl"
            >
              <div className="mb-5 flex gap-1">
                {[1,2,3,4,5].map((i)=>(
                  <Star
                    key={i}
                    size={18}
                    className="fill-orange-400 text-orange-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-zinc-300">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-white">
                  {item.name}
                </h3>

                <p className="text-zinc-500">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}