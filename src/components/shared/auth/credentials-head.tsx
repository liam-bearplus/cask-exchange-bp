import Image from "next/image";
import XIcon from '@/assets/images/x-icon.svg';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function CredentialsHead({title = "Page Title", desc, breadcrumb }:{title:string, desc?:string, breadcrumb?:boolean}) {
  return (
    <div className="flex-center flex-col pb-8">
      {breadcrumb ? (
        <Link href="/sign-in">
          <Button variant="ghost" className="min-w-0 mb-8" size="sm">
            <ChevronLeft className="h-4 w-4"/>
            Back
          </Button>
        </Link>
      ): (
        <div className="max-w-[15rem] pb-6">
          <Image src={XIcon} alt="X Icon" width={XIcon.width} height={XIcon.height} className="img-basic"/>
        </div>
      )}
      <h1 className="text-2xl font-semibold text-typo-primary">{title}</h1>
      {desc && <p className="text-sm mt-2 text-typo-body">{desc}</p>}
    </div>
  )
}