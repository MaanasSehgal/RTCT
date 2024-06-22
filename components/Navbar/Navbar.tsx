"use client";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {RTCTLogo, SearchIcon} from "@/components/Logos/Logos";

export default function NavbarComponent() {
    return (
        <Navbar className="lg:h-[10vh] h-[7vh]" >
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link href="/" className="flex items-center gap-2">
                        <RTCTLogo />
                        <p className="hidden sm:block font-bold">RTCT</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="items-center">
                <Input
                    classNames={{
                        base: "w-full h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "rounded-full h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} width={18} height={18} />}
                    type="search"
                />
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar isBordered as="button" className="transition-transform" color="secondary" name="Jason Hughes" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
