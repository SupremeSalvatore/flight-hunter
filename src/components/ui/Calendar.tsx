import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../../lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center mb-1',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        button_previous:
          'absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input transition-opacity',
        button_next:
          'absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input transition-opacity',
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].range_start)]:rounded-l-md [&:has([aria-selected].range_end)]:rounded-r-md [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button:
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors',
        range_start:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground rounded-l-md',
        range_end:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground rounded-r-md',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
        today: 'bg-accent text-accent-foreground font-bold',
        outside:
          'text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground rounded-none',
        hidden: 'invisible',
        ...classNames
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
