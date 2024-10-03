//COMPONENETS
import * as Components from '@/components/index';

//UTILS
import { ChartDataProps } from '@/components/charts/StockStatusChart';

export default function Home() {
  // const StockStatusChartData: ChartDataProps['data'] = [
  //   { status: 'notExpired', totalItems: 34, fill: 'var(--color-notExpired)' },
  //   { status: 'nearExpiration', totalItems: 12, fill: 'var(--color-nearExpiration)' },
  //   { status: 'expired', totalItems: 3, fill: 'var(--color-expired)' },
  // ];

  return (
    <div>
      <main>
        <div className="flex gap-4 items-center rounded-md space-y-2">
          <div className="bg-foreground w-16 h-16 rounded-full relative border-2 border-primary">
            <div className="absolute z-10 w-16 h-16 rounded-full border-4 border-background "></div>
          </div>
          <h1 className="text-xl">
            Bem vindo, <span className="font-semibold">Calvin</span>
          </h1>
        </div>
        <div className="space-y-8">
          <h2 className="mt-12 text-2xl font-extrabold text-primary">Como deseja começar?</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className='space-y-4'>
              <div className="rounded-xl h-[14rem] px-4 py-8 bg-red-200">Novo item</div>
              <div className="rounded-xl h-[10rem] px-4 py-8 bg-emerald-200">Novo item</div>
            </div>
            <div className='space-y-4'>
              <div className="rounded-xl h-[10rem] px-4 py-8 bg-purple-200">Novo item</div>
              <div className="rounded-xl h-[10rem] px-4 py-8 bg-yellow-200">Novo item</div>
            </div>
          </div>
        </div>

        {/* <div>
          <Components.StockStatusChart data={StockStatusChartData} />
        </div> */}
      </main>
    </div>
  );
}
