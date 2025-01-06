'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function ResidentComboBox({
  form,
  dataList,
  selectedResident,
  setSelectedResident,
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <FormField
        control={form.control}
        name='resident_id'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Data Penghuni</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                      'w-[240px] justify-between font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? dataList?.find(
                          (resident) => resident.id === field.value
                        )?.fullname
                      : 'Pilih Penghuni'}
                    <ChevronsUpDown className='opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0' align='start'>
                <ResidentList
                  setOpen={setOpen}
                  setSelectedResident={setSelectedResident}
                  dataList={dataList}
                />
              </PopoverContent>
            </Popover>
            <FormDescription>Pilih data penghuni</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control}
      name='resident_id'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Data Penghuni</FormLabel>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    'w-full justify-between font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {selectedResident.id ? (
                    <>{selectedResident.fullname}</>
                  ) : (
                    <>Pilih Resident</>
                  )}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </FormControl>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Pilih Penghuni</DrawerTitle>
                <DrawerDescription>Data penghuni</DrawerDescription>
              </DrawerHeader>
              <div className='mt-4 border-t'>
                <ResidentList
                  setOpen={setOpen}
                  setSelectedResident={setSelectedResident}
                  dataList={dataList}
                />
              </div>
            </DrawerContent>
          </Drawer>
          <FormDescription>Pilih data penghuni</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ResidentList({ setOpen, setSelectedResident, dataList }) {
  return (
    <Command>
      <CommandInput placeholder='Cari Nama Penghuni...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {dataList?.map((resident) => (
            <CommandItem
              key={resident.id}
              value={resident.id}
              onSelect={(value) => {
                setSelectedResident(
                  dataList.find((priority) => priority.id === value) || null
                );
                setOpen(false);
              }}
            >
              {resident.fullname}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

ResidentComboBox.propTypes = {
  form: PropTypes.object,
  dataList: PropTypes.array,
  selectedResident: PropTypes.object,
  setSelectedResident: PropTypes.func,
};

ResidentList.propTypes = {
  setOpen: PropTypes.func,
  setSelectedResident: PropTypes.func,
  dataList: PropTypes.array,
};
