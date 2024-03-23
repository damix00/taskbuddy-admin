import { ToastAction } from "@/components/ui/toast";
import { ToasterToast } from "@/components/ui/use-toast";

export function undoToast({
    toast,
    title,
    description,
    variant,
    undoAction,
    undoParams,
}: {
    toast: (data: Omit<ToasterToast, "id">) => void;
    title: string;
    description?: string;
    variant: "default" | "destructive" | null | undefined;
    undoAction?: (params: any) => Promise<any>;
    undoParams?: any;
}) {
    toast({
        title,
        description,
        variant,
        action: undoAction && (
            <ToastAction
                altText="Undo"
                onClick={async () => {
                    await undoAction(undoParams);

                    toast({
                        title: "Success",
                        description: "Action undone.",
                    });
                }}>
                Undo
            </ToastAction>
        ),
    });
}
