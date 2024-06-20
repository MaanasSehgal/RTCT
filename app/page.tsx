"use client";
import React from "react";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import AccordionComponent from "@/components/Accordion/AccordionComponent";
import Hero from "@/components/Hero/Hero";

const Page = () => {
    return (
        // Container
        <div className="box-border">
            <Hero />
            <FeatureCard />
            <AccordionComponent />
            <br />
            <br />
        </div>
    );
};

export default Page;

//get started
//features section
//accordian -> faq
//footer
