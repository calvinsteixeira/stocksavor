//COMPONENETS
import * as Components from '@/components/index';
import * as Icons from '@/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

//UTILS
import { ChartDataProps } from '@/components/charts/StockStatusChart';
import { KitchenStaplesProps } from '@/types/Data';
import { kitchenstaplesActions } from './actions/kitchenstaples';
import { ApiResponse } from '@/network/api';

export default async function Home() {
  const {
    data: fetchData,
    hasError: fetchHasError,
    status: fetchStatus,
  }: ApiResponse = await kitchenstaplesActions.get({
    start: 0,
    limit: 5,
  });

  function categorizeStockByStatus(kitchenData: typeof fetchData): ChartDataProps {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fiveDaysFromToday = new Date(today);
    fiveDaysFromToday.setDate(today.getDate() + 5);

    let notExpiredCount = 0;
    let nearExpirationCount = 0;
    let expiredCount = 0;

    kitchenData.forEach((item: KitchenStaplesProps) => {
      const [day, month, year] = item.expirationDate.split('/').map(Number);
      const expirationDate = new Date(year, month - 1, day);
      expirationDate.setHours(0, 0, 0, 0);

      if (expirationDate < today) {
        expiredCount += 1;
      } else if (expirationDate <= fiveDaysFromToday) {
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

  const StockStatusChartData = fetchData ? categorizeStockByStatus(fetchData) : null;

  return (
    <div>
      <main>
        {fetchStatus === 500 ? (
          <div className="h-screen flex flex-col items-center justify-center  -my-20 space-y-12">
            <Icons.Unplug strokeWidth={1} className="text-primary" size={160} />
            <p className="text-center">Tivemos um problema com a conexão do servidor. Por favor, tente novamente</p>
            <Button asChild className="w-[60%]">
              <a href="/">Atualizar página</a>
            </Button>
          </div>
        ) : (
          <>
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
              <h2 className="mt-12 text-2xl font-semibold text-primary">Seu dashboard</h2>
              <div className="flex gap-3 justify-between items-center">
                <Button className="flex-1 gap-2">
                  <Icons.Plus strokeWidth={1} />
                  novo item
                </Button>
                <Button variant="secondary" className="flex-1 gap-2">
                  <Icons.Box strokeWidth={1} />
                  meu estoque
                </Button>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              <div className="my-4">
                <Components.StockStatusChart data={StockStatusChartData?.data || []} />
              </div>
              <h2 className="font-semibold text-xl">Adicionados recentemente</h2>
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="size-2 rounded-full bg-[#10b981]"></div>
                    <p className="text-xs">No prazo</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="size-2 rounded-full bg-[#b99d10]"></div>
                    <p className="text-xs">Próximo de vencer</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="size-2 rounded-full bg-[#b91010]"></div>
                    <p className="text-xs">Vencido</p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                {fetchData.length == 0 ? (
                  <div className="w-full flex items-center justify-center">
                    <p className="text-center w-[80%]">Sem dados, comece adicionando novos itens</p>
                  </div>
                ) : (
                  <>
                    <Components.KitchenStaplesList data={fetchData} />
                    <div className="flex w-full justify-center items-center">
                      <Button size={'sm'} variant={'link'} className="text-foreground">
                        Acessar lista completa
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
