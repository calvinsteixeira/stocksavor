//COMPONENETS
import * as Components from '@/components/index';
import * as Icons from '@/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

//UTILS
import { ChartDataProps } from '@/components/charts/StockStatusChart';
import { ButtonProps } from '@/components/ui/button';

export default function Home() {
  const kitchenStaplesData = [
    {
      id: '1',
      name: 'Creme de leite',
      amount: 4,
      expirationDate: '03/10/2024',
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
    today.setHours(0, 0, 0, 0); // Zera a hora para comparação

    // Cria uma nova data que representa a data de hoje + 5 dias
    const fiveDaysFromToday = new Date(today);
    fiveDaysFromToday.setDate(today.getDate() + 5);

    let notExpiredCount = 0;
    let nearExpirationCount = 0;
    let expiredCount = 0;

    kitchenData.forEach((item) => {
      const [day, month, year] = item.expirationDate.split('/').map(Number);
      const expirationDate = new Date(year, month - 1, day);
      expirationDate.setHours(0, 0, 0, 0); // Zera a hora da data de validade

      // Compara as datas
      if (expirationDate < today) {
        expiredCount += 1; // Vencido
      } else if (expirationDate <= fiveDaysFromToday) {
        nearExpirationCount += 1; // Perto de vencer
      } else {
        notExpiredCount += 1; // Não vencido
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
            <Image
              src={'/profile.jpg'}
              alt="Imagem com elementos arredondados nos cantos em cores claras."
              objectFit="cover"
              fill
              className="z-0 absolute rounded-full"
            />
          </div>
          <h1 className="text-xl">
            Bem vindo, <span className="font-semibold">Fulano</span>
          </h1>
        </div>
        <div className="space-y-8">
          <h2 className="mt-12 text-2xl font-extrabold text-primary">Seu dashboard</h2>
          <div className="flex gap-3 justify-between items-center">
            <Button className="flex-1 bg-primary gap-2">
              <Icons.Plus strokeWidth={1} />
              novo item
            </Button>
            <Button className="flex-1 bg-[#10b981] gap-2">
              <Icons.Box strokeWidth={1} />
              meu estoque
            </Button>
          </div>
        </div>
        <div className="mt-10 space-y-6">
          <div className="my-4">
            <Components.StockStatusChart data={StockStatusChartData.data} />
          </div>
          <h2 className="font-semibold text-xl">Adicionados recentemente</h2>
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="size-2 rounded-full bg-[#10b981]"></div>
                <p className="text-sm">No prazo</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="size-2 rounded-full bg-[#b99d10]"></div>
                <p className="text-sm">Próximo de vencer</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="size-2 rounded-full bg-[#b91010]"></div>
                <p className="text-sm">Vencido</p>
              </div>
            </div>
          </div>
          <Components.KitchenStaplesList data={kitchenStaplesData} />
          <div className="flex w-full justify-center">
            <Button variant={'link'} className='text-foreground'>
              Acessar lista completa
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
