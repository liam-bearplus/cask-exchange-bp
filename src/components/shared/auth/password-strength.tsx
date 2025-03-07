import usePasswordValidate from "@/hooks/usePasswordValidate";
import { passwordConstraintContent } from "@/lib/constants";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function PasswordStrength({
    password = "",
}: {
    password?: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const { validateContains, pointPasswordStrong } =
        usePasswordValidate(password);

    useEffect(() => {
        if (password.length > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [password]);

    return (
        <div
            className={`overflow-hidden pt-2.5 transition ${isVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
        >
            <PasswordStrengthBar validCount={pointPasswordStrong} />
            <div className="space-y-1.5">
                {passwordConstraintContent.map((item) => {
                    const isInvalid = !validateContains.includes(item.name);
                    return (
                        <PasswordStrengthItem
                            key={item.name}
                            content={item.message}
                            isInvalid={isInvalid}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function PasswordStrengthItem({
    content = "",
    isInvalid = false,
}: {
    content: string;
    isInvalid: boolean;
}) {
    return (
        <div className="flex gap-x-1">
            <div className="mt-0.5">
                <Check
                    size={16}
                    className={`h-4 w-4 transition-colors ${isInvalid ? "text-typo-disable" : "text-success"}`}
                />
            </div>
            <span
                className={`text-sm transition-colors ${isInvalid ? "text-typo-disable" : "text-typo-body"}`}
            >
                {content}
            </span>
        </div>
    );
}
function PasswordStrengthBar({ validCount }: { validCount: number }) {
    const color =
        validCount == 1
            ? "bg-error"
            : validCount == 2
              ? "bg-warn"
              : validCount == 3
                ? "bg-info"
                : "bg-success";
    return (
        <div className="color-error mb-4 flex gap-x-1">
            <div
                className={`h-1 w-full rounded-lg ${validCount >= 1 ? color : "bg-bg-sf2"}`}
            ></div>
            <div
                className={`h-1 w-full rounded-lg ${validCount >= 2 ? color : "bg-bg-sf2"}`}
            ></div>
            <div
                className={`h-1 w-full rounded-lg ${validCount >= 3 ? color : "bg-bg-sf2"}`}
            ></div>
            <div
                className={`h-1 w-full rounded-lg ${validCount >= 4 ? color : "bg-bg-sf2"}`}
            ></div>
        </div>
    );
}
