import Link from "next/link";
import Image from "next/image";
import XIcon from '@/assets/images/x-icon.svg';

export default function CredentialsHead({title = "Page Title"}:{title:string}) {
  return (
    <div className="flex-center flex-col pb-8">
      <div className="max-w-[15rem] pb-6">
        <Image src={XIcon} alt="X Icon" width={XIcon.width} height={XIcon.height} className="img-basic"/>
      </div>
      <h1 className="text-2xl font-semibold text-typo-primary">{title}</h1>
    </div>
  )
}