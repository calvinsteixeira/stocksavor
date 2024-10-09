//COMPONENETS
import * as Componenets from '@/components/index';
import * as Icons from '@/icons';
import Link from 'next/link';

//UTILS
import React from 'react';
import { getExpirationStatus } from '@/lib/utils';
import { KitchenStaplesProps } from '@/types/Data';

type KitchenStaplesListProps = {
  data: KitchenStaplesProps[]
};

export function KitchenStaplesList(props: KitchenStaplesListProps) {
  return (
    <div className="space-y-4">
      {props.data.map((item: KitchenStaplesProps, index: number) => {
        const { message: expirationMessage, color: expirationColor } = getExpirationStatus(item.expirationDate);

        return (
          <Link href={`/stock/product?id=${item.id}`} key={item.id} className="w-full flex pb-2 items-center justify-between border-b-2 border-muted">
            <div className="flex gap-2 items-center">
              <Icons.Apple className="size-8 mr-4" strokeWidth={1} />
              <div className="space-y-1">
                <p className="truncate font-semibold text-lg leading-5">{item.name}</p>
                <div className={`flex gap-2 items-center`}>
                  <p style={{ backgroundColor: expirationColor }} className="text-xs text-white px-2 py-[0.5px] rounded-md">
                    {expirationMessage}
                  </p>
                </div>
              </div>
            </div>
            <p className="ml-2">{item.amount} un</p>
          </Link>
        );
      })}
    </div>
  );
}
