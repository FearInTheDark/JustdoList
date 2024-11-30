import React, {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import AppLayout from "@/layouts/AppLayout";
import GridPattern from "@/components/ui/grid-pattern";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { usePage } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import ShinyButton from "@/components/ui/shiny-button";
import { Skeleton } from "@/components/ui/skeleton";
import Post from "@/components/Post";
import { MyPagination } from "@/components/MyPagination";
import axios from 'axios';
import HomeDock from "@/components/HomeDock"
import AOS from "aos"

const Events = () => {
    const [page, setPage] = useState(1);
    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { user } = usePage().props;
    user.is_admin ||= false
    const isAdmin = user.is_admin ?? false;

    useEffect(() => {
        AOS.init({
            once: false,
            duration: 400,
            disable: "phone",
            easing: "ease-out-cubic"
        })
    }, []);

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/posts?page=${page}`);
                setEvents(response.data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents().then();
    }, [page]);

    const LazyShowDialog = lazy(() => import('@/components/app/ShowEvent'))


    return (
        <>
            <GridPattern
                width={20} height={20}
                x={-1} y={-1}
                strokeDasharray="4 2"
                className="fixed [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] z-0 size-full"
            />
            <div className="h-full px-8 pb-0 pt-12 bg-gray-200 dark:bg-gray-800">
                <div className="max-w-6xl flex flex-col w-full px-2 gap-4">
                    {/* Header */}
                    <GradualSpacing
                        className="text-center text-4xl font-bold -tracking-widest mb-8 text-black dark:text-white md:text-7xl md:leading-[5rem]"
                        text="World Events"/>

                    {isLoading ? (
                        <>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        </>

                    ) : (
                        <>
                            {events?.data.map((event) => (
                                    <Post event={event} key={event.title} onClick={() => setSelectedEvent(event)}/>
                            ))}

                            <MyPagination links={events?.links || []} action={setPage} />

                            {selectedEvent && (
                                <Suspense fallback={<LoadingSkeleton />}>
                                    <LazyShowDialog event={selectedEvent} setEvent={setSelectedEvent} setEvents={setEvents}/>
                                </Suspense>
                            )}
                        </>
                    )}
                </div>

                {isAdmin && (
                    <ShinyButton className="fixed bottom-10 right-10 p-4 rounded-full text-white shadow-lg hover:scale-105 transition-all duration-300">
                        <PlusIcon className="w-10 h-10" />
                    </ShinyButton>
                )}
            </div>
        </>
    );
};

const LoadingSkeleton = () => (
    <div className="flex flex-col space-y-3 mx-auto">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    </div>
);

Events.layout = page => <AppLayout>{page}</AppLayout>;
export default Events;
