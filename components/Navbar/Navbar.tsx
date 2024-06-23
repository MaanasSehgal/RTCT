"use client";
import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";
import {RTCTLogo, SearchIcon} from "@/components/Logos/Logos";
import {LogoutLink, useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

export default function NavbarComponent() {
    const {user, isLoading} = useKindeBrowserClient();
    return (
        <Navbar className="lg:h-[10vh] h-[7vh]">
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link href="/" className="flex items-center gap-2">
                        <RTCTLogo/>
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
                    startContent={<SearchIcon size={18} width={18} height={18}/>}
                    type="search"
                />
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        {!user ?
                            <Avatar isBordered as="button" className="transition-transform" color="secondary" size="sm"
                                    name=" " src=""/>
                            : <Avatar isBordered as="button" className="transition-transform" color="secondary"
                                      name="Jason Hughes" size="sm" src={user?.picture || ""}/>
                        }
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            {!user ? <p className="font-semibold">Not Signed in.</p> :
                                <>
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{user?.email}</p>
                                </>

                            }

                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        {!user ?
                            <DropdownItem key="login">
                                <Link href="/login">Login/Register</Link>
                            </DropdownItem>
                            :
                            <DropdownItem key="logout" color="danger">
                                <LogoutLink
                                    postLogoutRedirectURL={process.env.NEXT_PUBLIC_SITE_URL}
                                >Log Out</LogoutLink>
                            </DropdownItem>
                        }

                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
