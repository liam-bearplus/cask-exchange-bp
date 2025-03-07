import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PasswordStrength({ password='' }: { password?: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (password.length > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [password]);
    return (
        <div className={`pt-2.5 transition overflow-hidden ${isVisible ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'}`}>
            <PasswordStrengthBar password={password} />
            <div className="space-y-1.5">
                <PasswordStrengthItem content="At least 8 characters" isInvalid={password.length < 8} />
                <PasswordStrengthItem content="At least 1 lowercase letter" isInvalid={!/[a-z]/.test(password)} />
                <PasswordStrengthItem content="At least 1 uppercase letter" isInvalid={!/[A-Z]/.test(password)} />
                <PasswordStrengthItem content="At least 1 number or special character" isInvalid={!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)} />
            </div>
        </div>
    )
}

function PasswordStrengthItem({ content='', isInvalid=false }: { content: string; isInvalid: boolean }) {
    return (
        <div className="flex gap-x-1">
            <div className="mt-0.5">
                <Check size={16} className={`transition-colors w-4 h-4 ${isInvalid ? 'text-typo-disable' : 'text-success'}`}/>
            </div>
            <span className={`transition-colors text-sm ${isInvalid ? 'text-typo-disable' : 'text-typo-body'}`}>{content}</span>
        </div>
    )
}
function PasswordStrengthBar({password=''}: {password?: string}) {
    const validCount = [
        password.length >= 8,
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /[0-9!@#$%^&*(),.?":{}|<>]/.test(password)
    ].filter(Boolean).length;
    const color = validCount == 1 ? 'bg-error' : validCount == 2 ? 'bg-warn' : validCount == 3 ? 'bg-info' : 'bg-success';
    return (
        <div className="flex gap-x-1 color-error mb-4">
            <div className={`w-full h-1 rounded-lg ${validCount >= 1 ? color : 'bg-bg-sf2'}`}></div>
            <div className={`w-full h-1 rounded-lg ${validCount >= 2 ? color : 'bg-bg-sf2'}`}></div>
            <div className={`w-full h-1 rounded-lg ${validCount >= 3 ? color : 'bg-bg-sf2'}`}></div>
            <div className={`w-full h-1 rounded-lg ${validCount >= 4 ? color : 'bg-bg-sf2'}`}></div>
        </div>
    )
}