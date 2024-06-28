import * as React from "react"

import { CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardBody, CardFooter, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Button } from "@nextui-org/react";
import { AddNoteIcon, CopyDocumentIcon, DeleteDocumentIcon, EditDocumentIcon } from './NextUIIcons';
import Image from "next/image"
import {CircleEllipsisIcon, Ellipsis} from "lucide-react";
import { useRouter } from "next/navigation";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";

interface CarouselSpacingProps {
    isShared: boolean;
    projects?: any[];
  states?: any;
  }

export function CarouselSpacing({ isShared, projects = [], states }: CarouselSpacingProps) {
const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const {getToken} = useKindeBrowserClient();
  const [setProjects, setYourProjects] = states;
  const router = useRouter();

  async function handleDelete(projectId: string) {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}`,
        {
          params: {
            audience: "rtct_backend_api"
          },
          headers: {
            'Authorization': 'Bearer ' + getToken()
          },

        }
    )
        .then(function (response) {
          setProjects((prevState: any) => {
            return prevState.filter((project: any) => project.projectId !== response.data.projectId)
          })
          setYourProjects((prevState: any) => {
            return prevState.filter((project: any) => project.projectId !== response.data.projectId)
          })
        })
        .catch(function (error) {
          console.log(error);
        });
  }

return (
    <>
    <Carousel className="md:w-4/5 w-1/2 h-48 md:inline-block hidden">
      <CarouselContent className="-ml-1">
        {projects.map((project, index) => (
          <CarouselItem key={index} className="w-1/2 px-3 py-2 h-full md:basis-1/2 lg:basis-1/3">
            <Card className="mx:h-30 w-full min-w-32 bg-red-300" shadow="sm" key={'item'} isPressable
                  onClick={() => router.push("/" +
                      "projects/dashboard/" + project.projectId
                  )}>
            <Dropdown>
                <DropdownTrigger className="">
                    <Ellipsis
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
                        onClick={() => {
                          console.log('delete')
                          handleDelete(project.projectId);
                        }}
                    >
                        Delete file
                    </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
                </Dropdown>
                <CardBody className="flex justify-center h-32 items-center">
                    {isShared ? (
                    <Image className="rounded-full w-20 h-20 object-cover" width={70} height={70} src={project.image} alt={project.name}></Image>
                    ) : (
                        <Image className="rounded-full w-20 h-20 object-cover" width={70} height={70} src={project.image} alt={project.name}></Image>
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
        
        <Card className="h-64 w-full" shadow="sm" key={'item'} isPressable
              onClick={() => router.push("/" +
                  "projects/dashboard/" + project.projectId
              )}>
        <Dropdown>
            <DropdownTrigger className="">
                <Ellipsis
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
                    onClick={() => {
                      console.log('delete')
                      handleDelete(project.projectId);
                    }}
                >
                    Delete file
                </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
            </Dropdown>
            <CardBody className="flex justify-center h-32 items-center">
                <Image width={70} height={70} src={project.image} alt={project.name}></Image>
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