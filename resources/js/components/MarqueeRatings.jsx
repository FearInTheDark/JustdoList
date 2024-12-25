import {cn} from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import {BorderBeam} from "@/components/ui/border-beam.tsx";
import {useQuery} from "@tanstack/react-query"
import {Loader} from "lucide-react"
import {useMemo} from "react"

const ReviewCard = ({user, content,}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-50/[.5] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={`/storage/app/avatars/${user.image}`}/>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {user.name}
                    </figcaption>
                    <p className="text-xs font-medium text-muted-foreground dark:text-white/40">{user.email}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </blockquote>
        </figure>
    );
};

export function MarqueeRatings() {
    const {data, isLoading} = useQuery({
        queryKey: ['feedbacks-landing'],
        queryFn: async () => {
            const {data} = await axios.get(route('feedback-landing'))
            return Object.values(data)
        },
        refetchOnWindowFocus: false,
    })
    const firstRow = useMemo(() => data?.slice(0, data.length / 2) ?? [], [data])
    const secondRow = useMemo(() => data?.slice(data.length / 2) ?? [], [data])
    return (
        <div className="relative flex w-[95%] mx-auto mb-6 h-fit flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent"
             data-aos="zoom-y-out" data-aos-delay="600"
        >
            {isLoading ? <Loader/> :
                <>
                    <Marquee pauseOnHover className="[--duration:100s]">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.content}{...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:100s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.content} {...review} />
                        ))}
                    </Marquee>
                </>
            }
            {/*<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/60 dark:from-background"></div>*/}
            {/*<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/60 dark:from-background"></div>*/}
            <BorderBeam size={400} borderWidth={1.5}/>
        </div>
    );
}
