import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImgHTMLAttributes, useState } from "react";
type IProps = {
    src: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function ImagePlaceholder({ src, ...props }: IProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={cn("relative h-full w-full", props.className)}>
            {isLoaded ? (
                <Image
                    {...props}
                    src={src}
                    onLoad={() => setIsLoaded(true)}
                    className="img-basic absolute inset-0 z-20"
                    width={props.width as number}
                    height={props.height as number}
                    alt={props.alt as string}
                    sizes="(max-width: 1728px) 100vw, 1728px"
                />
            ) : (
                <Image
                    {...props}
                    src={src}
                    alt={props.alt as string}
                    className="img-basic absolute inset-0 z-10"
                    loading="eager"
                    width={100}
                    height={100}
                />
            )}
        </div>
    );
}
