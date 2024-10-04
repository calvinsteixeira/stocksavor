//COMPONENETS
import * as Components from '@/components/index';

//UTILS
import { ChartDataProps } from '@/components/charts/StockStatusChart';

export default function Home() {
  const kitchenStaplesData = [
    {
      id: '1',
      name: 'Creme de leite',
      amount: 4,
      expirationDate: '05/10/2024',
    },
    {
      id: '2',
      name: 'Nescau',
      amount: 1,
      expirationDate: '12/12/2024',
    },
    {
      id: '3',
      name: 'Leite zero lactose',
      amount: 2,
      expirationDate: '25/11/2024',
    },
    {
      id: '4',
      name: 'Lata de milho',
      amount: 1,
      expirationDate: '05/10/2024',
    },
    {
      id: '5',
      name: 'Lata de milho',
      amount: 1,
      expirationDate: '16/10/2024',
    },
  ];

  function categorizeStock(kitchenData: typeof kitchenStaplesData): ChartDataProps {
    const today = new Date();
    let notExpiredCount = 0;
    let nearExpirationCount = 0;
    let expiredCount = 0;

    kitchenData.forEach((item) => {
      const [day, month, year] = item.expirationDate.split('/').map(Number);
      const expirationDate = new Date(year, month - 1, day);

      const diffTime = expirationDate.getTime() - today.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        expiredCount += 1;
      } else if (diffDays <= 5) {
        nearExpirationCount += 1;
      } else {
        notExpiredCount += 1;
      }
    });

    return {
      data: [
        { status: 'notExpired', totalItems: notExpiredCount, fill: 'var(--color-notExpired)' },
        { status: 'nearExpiration', totalItems: nearExpirationCount, fill: 'var(--color-nearExpiration)' },
        { status: 'expired', totalItems: expiredCount, fill: 'var(--color-expired)' },
      ],
    };
  }

  const StockStatusChartData = categorizeStock(kitchenStaplesData);

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
          <div></div>
        </div>
        <div className="mt-10 space-y-6">
          <div className="my-4">
            <Components.StockStatusChart data={StockStatusChartData.data} />
          </div>
          <h2 className="font-semibold text-xl">Adicionados recentemente</h2>
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="size-2 rounded-full bg-[#278727]"></div>
                <p className="text-sm">No prazo</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="size-2 rounded-full bg-[#df972a]"></div>
                <p className="text-sm">Próximo de vencer</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="size-2 rounded-full bg-[#a93232]"></div>
                <p className="text-sm">Vencido</p>
              </div>
            </div>
          </div>
          <Components.KitchenStaplesList data={kitchenStaplesData} />
        </div>
      </main>
    </div>
  );
}
