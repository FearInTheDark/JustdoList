import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

const General = ({user, setUser}) => {
    return (
        <div className="w-full max-w-md space-y-8 p-6">
            <div className="space-y-2">
                <h3 className="text-base font-medium">Language</h3>
                <Select defaultValue="english">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="vietnamese">Vietnamese</SelectItem>
                        <SelectItem value="spanish" disabled>Spanish</SelectItem>
                        <SelectItem value="french" disabled>French</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <h3 className="text-base font-medium">Home view</h3>
                <Select defaultValue="today">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select view"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-6">
                <h3 className="text-base font-medium">Date & time</h3>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Time zone</h4>
                    <Select defaultValue="asia-ho-chi-minh">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select timezone"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asia-ho-chi-minh">Asia/Ho_Chi_Minh</SelectItem>
                            <SelectItem value="utc" disabled>UTC</SelectItem>
                            <SelectItem value="est" disabled>EST</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Time format</h4>
                    <Select defaultValue="24">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select time format"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="24">13:00</SelectItem>
                            <SelectItem value="12">1:00 PM</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Date format</h4>
                    <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select date format"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                            <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}


export default General;
