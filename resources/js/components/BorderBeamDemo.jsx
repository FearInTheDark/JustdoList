import {BorderBeam} from "@/components/ui/border-beam";

export function BorderBeamDemo() {
    return (
        <div className="relative flex h-[500px] w-[90%] mx-auto mt-4 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Border Beam
          </span>
            <BorderBeam size={250} duration={12} delay={9}/>
        </div>
    );
}
