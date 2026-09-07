import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SpatialBackground from "../components/3d/SpatialBackground";
import { Button } from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#08080a] px-6 text-center overflow-hidden">
      <SpatialBackground />
      <div className="relative z-10 space-y-4">
        <h1 className="text-8xl font-black text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text tracking-tight">
          404
        </h1>
        <h2 className="text-3xl font-black text-white tracking-tight">
          Spatial Route Not Found
        </h2>
        <p className="max-w-md text-xs text-zinc-400 leading-relaxed">
          The StudentOS module or page you're looking for doesn't exist or has moved.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button leftIcon={<ArrowLeft size={16} />}>
              Back to Workspace Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
