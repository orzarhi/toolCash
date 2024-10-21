'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ResponsiveDialogProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  textCenter?: boolean;
}

export const ResponsiveDialog = ({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  textCenter,
}: ResponsiveDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          'sm:max-w-[525px] w-11/12 mt-8 rounded-lg max-h-[80vh] overflow-y-auto',
          {
            'text-center': textCenter,
          }
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription
              className={cn('!text-muted-foreground', {
                'text-center': textCenter,
              })}
            >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
