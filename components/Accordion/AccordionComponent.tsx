import {Accordion, AccordionItem} from "@nextui-org/accordion";
import React from "react";

const AccordionComponent = () => {
    return (
        <div className="w-full max-w-[90%] mx-auto p-4 rounded-lg shadow-md">
            <Accordion className="space-y-4">
                <AccordionItem className="p-4 rounded-lg shadow-md" key="1" aria-label="FAQ 1" title="What is RTCT?">
                    <p className="text-[--darkText2]">
                        RTCT is a comprehensive web-based tool designed to facilitate seamless real-time collaboration for remote teams. It allows users to work together on documents, spreadsheets,
                        and projects, providing features such as live chat, video conferencing, task management, and version control to enhance productivity and teamwork.
                    </p>
                </AccordionItem>
                <AccordionItem className="p-4 rounded-lg shadow-sm" key="2" aria-label="FAQ 2" title="How does real-time collaboration work on RTCT?">
                    <p className="text-[--darkText2]">
                        Real-time collaboration on RTCT enables multiple team members to work on the same document, spreadsheet, or project simultaneously. Changes made by one team member are
                        instantly visible to all others, ensuring that everyone is always on the same page. This feature greatly improves efficiency and coordination within the team.
                    </p>
                </AccordionItem>
                <AccordionItem className="p-4 rounded-lg shadow-sm" key="3" aria-label="FAQ 3" title="What types of files can we collaborate on RTCT?">
                    <p className="text-[--darkText2]">
                        RTCT supports collaboration on various file types, including documents, spreadsheets, and code files. You can edit these files live, with all changes being automatically saved
                        and version-controlled, allowing you to revert to previous versions if needed.
                    </p>
                </AccordionItem>
                <AccordionItem className="p-4 rounded-lg shadow-sm" key="4" aria-label="FAQ 4" title="How do I assign and track tasks on RTCT?">
                    <p className="text-[--darkText2]">
                        You can create, assign, and track tasks through RTCT's integrated task management system. Tasks can be linked to project progress, and our dashboards provide visual
                        representations of task completion and overall project progress, making it easy to monitor and manage your team's workload.
                    </p>
                </AccordionItem>
                <AccordionItem className="p-4 rounded-lg shadow-sm" key="5" aria-label="FAQ 5" title="What communication tools are available on RTCT?">
                    <p className="text-[--darkText2]">
                        RTCT includes a range of communication tools such as live chat, video conferencing, and voice chat. These features ensure that team members can easily communicate and
                        collaborate in real-time, regardless of their location.
                    </p>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default AccordionComponent;
