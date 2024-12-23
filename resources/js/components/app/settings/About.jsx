import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import AppIcon from "@/components/app/app-icon"
import {Separator} from "@/components/ui/separator"
import {Button} from "@/components/ui/button"
import {Github, Globe, Mail, Twitter} from "lucide-react"

const About = (user, setUser) => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="overflow-hidden">
                <CardHeader className="text-center pb-0">
                    <div className="mx-auto mb-4 relative w-32 h-32">
                        <AppIcon classname="size-full"/>
                    </div>
                    <CardTitle className="text-3xl font-bold">JustdoList</CardTitle>
                    <CardDescription>Simplify your life, one task at a time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 mt-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">About Us</h2>
                        <p className="text-muted-foreground">
                            JustdoList is a powerful task management application designed to help individuals and teams organize, prioritize, and accomplish their goals efficiently. Our mission is to provide a seamless and intuitive platform that enhances productivity and reduces stress in both personal and professional lives.
                        </p>
                    </section>
                    <Separator/>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Intuitive task creation and management</li>
                            <li>Customizable project boards and lists</li>
                            <li>Collaboration tools for teams</li>
                            <li>Reminders and notifications</li>
                            <li>Cross-platform synchronization</li>
                            <li>Detailed analytics and progress tracking</li>
                        </ul>
                    </section>
                    <Separator/>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Our Team</h2>
                        <p className="text-muted-foreground">
                            JustdoList was founded by a group of productivity enthusiasts who believed in the power of organization to transform lives. Our diverse team of developers, designers, and productivity experts work tirelessly to bring you the best task management experience possible.
                        </p>
                    </section>
                    <Separator/>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                        <p className="text-muted-foreground mb-4">
                            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Mail className="h-4 w-4"/>
                                Email Us
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Twitter className="h-4 w-4"/>
                                Follow on Twitter
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Github className="h-4 w-4"/>
                                GitHub
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Globe className="h-4 w-4"/>
                                Visit Website
                            </Button>
                        </div>
                    </section>
                </CardContent>
                <CardFooter className="bg-muted/50 mt-6">
                    <p className="text-sm text-muted-foreground text-center w-full">
                        © 2023 JustdoList. All rights reserved.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default About;
