"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
type IProps = {
    src: string;
    unoptimized?: boolean;
    priority?: boolean;
    imgClassName?: string;
} & React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
>;

export default function ImagePlaceholder({
    src,
    imgClassName,
    ...props
}: IProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={cn("relative h-full w-full", props.className)}>
            {isLoaded ? (
                <Image
                    {...props}
                    src={src}
                    className="img-h absolute inset-0 z-20"
                    width={props.width as number}
                    height={props.height as number}
                    alt={props.alt as string}
                    quality={100}
                    sizes={`(max-width:${props.width}) 100vw, ${props.width}px`}
                />
            ) : (
                <Image
                    {...props}
                    src={src}
                    onLoad={() => setIsLoaded(true)}
                    alt={props.alt as string}
                    className="img-h relative inset-0 z-10"
                    loading="eager"
                    width={100}
                    height={100}
                />
            )}
        </div>
    );
}
