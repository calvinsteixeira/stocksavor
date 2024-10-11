import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type AlertDialogProps = {
  title: string;
  description: string;
  children: React.ReactElement;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
};

export function ConfirmationDialog(props: AlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-80">
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-center gap-6 items-end">
          <AlertDialogCancel>{props.cancelText || 'Cancelar'}</AlertDialogCancel>
          <AlertDialogAction onClick={props.onConfirm}>{props.confirmText || 'Confirmar'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
