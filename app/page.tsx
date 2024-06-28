"use client";
import React from "react";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import AccordionComponent from "@/components/Accordion/AccordionComponent";
import Hero from "@/components/Hero/Hero";
import FeedBackSection from "@/components/FeedBackSection/FeedBackSection";

const Page = () => {
    return (
        // Container
        <div className="box-border">
            <Hero />
            <br /><br />
            <FeatureCard />
            <br /><br />
            <AccordionComponent />
            <br /><br />
            <FeedBackSection />
        </div>
    );
};

export default Page;

//get started
//features section
//accordian -> faq
//footer
