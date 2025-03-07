import Image from 'next/image';
import SignupSuccessIcon from '@/assets/images/signup-success.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignupSuccess() {
    return (
        <div className="flex-center flex-col space-y-8">
            <div className="w-20 h-20">
                <Image
                    alt="Signup success"
                    src={SignupSuccessIcon}
                    width={SignupSuccessIcon.width}
                    height={SignupSuccessIcon.height}
                    className="img-basic"
                />
            </div>
            <div className="text-center">
                <div className='text-2xl font-semibold text-typo-primary mb-2'>Welcome aboard, Steve!</div>
                <div className="text-base text-typo-body">To activate your account and start exploring CaskExchange Platform, please verify your account by clicking the link we just sent to your email address.</div>
            </div>
            <Link href="/sign-in" className='w-full'>
                <Button variant='default' className='w-full'>Back</Button>
            </Link>
        </div>
    )
}