'use client';

//COMPONENTS
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

//UTILS
import * as React from 'react';

export interface ChartDataProps {
  data: {
    status: 'notExpired' | 'nearExpiration' | 'expired';
    totalItems: number;
    fill?: string;
  }[];
}

const chartConfig = {
  notExpired: {
    label: 'Não vencido',
    color: '#10b981',
  },
  nearExpiration: {
    label: 'Próximo de vencer',
    color: '#b99d10',
  },
  expired: {
    label: 'Vencido',
    color: '#b91010',
  },
} satisfies ChartConfig;

export function StockStatusChart(props: ChartDataProps) {
  const totalItems = React.useMemo(() => {
    return props.data.reduce((acc, curr) => acc + curr.totalItems, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Visão geral dos itens a vencer</CardTitle>
        <CardDescription className="text-center">Total de itens com base na situação da validade</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          {totalItems > 0 ? (
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={props.data} dataKey="totalItems" nameKey="status" innerRadius={60} strokeWidth={5}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalItems.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Itens no estoque
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          ) : (
            <div className="flex w-full h-full items-center">
              <p className="text-center text-lg">Sem dados, comece adicionando novos itens</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground text-center">Itens que estão a 5 dias de vencer são considerados próximos do vencimento.</div>
      </CardFooter>
    </Card>
  );
}
