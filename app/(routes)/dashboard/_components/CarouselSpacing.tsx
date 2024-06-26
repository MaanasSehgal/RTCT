import * as React from "react"

import { CardContent } from "@/components/UI/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/UI/carousel"

import { Card, CardBody, CardFooter, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Button } from "@nextui-org/react";
import { AddNoteIcon, CopyDocumentIcon, DeleteDocumentIcon, EditDocumentIcon } from './NextUIIcons';
import Image from "next/image"
import { CircleEllipsisIcon } from "lucide-react";

interface CarouselSpacingProps {
    isShared: boolean;
    projects?: any[];
  }

export function CarouselSpacing({ isShared, projects = [] }: CarouselSpacingProps) {
const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  return ( 
    <>
    <Carousel className="md:w-4/5 w-1/2 h-48 md:inline-block hidden">
      <CarouselContent className="-ml-1">
        {projects.map((project, index) => (
          <CarouselItem key={index} className="w-1/2 px-3 py-2 h-full md:basis-1/2 lg:basis-1/3">
            <Card className="mx:h-30 w-full" shadow="sm" key={'item'} isPressable >
            <Dropdown>
                <DropdownTrigger className="">
                    <CircleEllipsisIcon
                        width={25}
                        height={25}
                        className="absolute right-0 mr-1 mt-1"
                        />
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                <DropdownSection title="Actions" showDivider>  
                    <DropdownItem
                        key="copy"
                        description="Copy the file link"
                        startContent={<CopyDocumentIcon className={iconClasses} />}
                    >
                        Copy link
                    </DropdownItem>
                    <DropdownItem
                        key="edit"
                        description="Allows you to edit the file"
                        startContent={<EditDocumentIcon className={iconClasses} />}
                    >
                        Edit file
                    </DropdownItem>
                    </DropdownSection>
                    <DropdownSection title="Danger zone">  
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        description="Permanently delete the file"
                        startContent={<DeleteDocumentIcon color="danger" className={`${iconClasses} text-red-500`} />}
                    >
                        Delete file
                    </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
                </Dropdown>
                <CardBody className="flex justify-center h-32 items-center">
                    {isShared ? (
                    <Image className="rounded-full" width={70} height={70} src={project.owner.image} alt={project.name}></Image>
                    ) : (
                        <Image width={70} height={70} src={project.type.imageUrl} alt={project.name}></Image>
                    )}
                </CardBody>
                <CardFooter className="text-small justify-center bg-zinc-700">
                    <p className="text-white font-bold text-center text-lg self-center truncat line-clamp-1">{project.name}</p>
                </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    {/*  small screen size */}
    <div className="md:hidden flex flex-col px-[10%] w-full gap-10 mt-10">
    {projects.map((project) => (
        
        <Card className="h-64 w-full" shadow="sm" key={'item'} isPressable >
        <Dropdown>
            <DropdownTrigger className="">
                <CircleEllipsisIcon
                    width={30}
                    height={30}
                    className="absolute right-0 mr-4 mt-4"
                    />
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownSection title="Actions" showDivider>  
                <DropdownItem
                    key="new"
                    shortcut="⌘N"
                    description="Create a new file"
                    startContent={<AddNoteIcon className={iconClasses} />}
                >
                    New file
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    shortcut="⌘C"
                    description="Copy the file link"
                    startContent={<CopyDocumentIcon className={iconClasses} />}
                >
                    Copy link
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    shortcut="⌘⇧E"
                    description="Allows you to edit the file"
                    startContent={<EditDocumentIcon className={iconClasses} />}
                >
                    Edit file
                </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">  
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    shortcut="⌘⇧D"
                    description="Permanently delete the file"
                    startContent={<DeleteDocumentIcon className={`text-danger ${iconClasses}`} />}
                >
                    Delete file
                </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
            </Dropdown>
            <CardBody className="flex justify-center h-32 items-center">
                <Image width={70} height={70} src={project.type.imageUrl} alt={project.name}></Image>
            </CardBody>
            <CardFooter className="text-small justify-center bg-zinc-700">
                <p className="text-white font-bold text-center text-lg self-center truncat line-clamp-1">{project.name}</p>
            </CardFooter>
        </Card>
    ))}
    </div>
    </>
  )
}