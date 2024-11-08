import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import {BorderBeam} from "@/components/ui/border-beam.tsx";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "./storage/landing-images/avatar-05.jpg",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "./storage/landing-images/avatar-05.jpg",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "./storage/landing-images/avatar-05.jpg",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "./storage/landing-images/avatar-05.jpg",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "./storage/landing-images/avatar-05.jpg",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "./storage/landing-images/avatar-05.jpg",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({img,name,username,body,}) => {
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
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function MarqueeRatings() {
    return (
        <div className="relative flex w-[95%] mx-auto mb-6 h-fit flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent"
                data-aos="zoom-y-out" data-aos-delay="600"
        >
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username}{...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            {/*<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/60 dark:from-background"></div>*/}
            {/*<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/60 dark:from-background"></div>*/}
            <BorderBeam size={400} borderWidth={1.5} />
        </div>
    );
}
