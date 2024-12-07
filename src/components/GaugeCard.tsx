import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GaugeChart } from './GaugeChart';

export function GaugeCard() {
  return (
    <Card className='max-w-96 inline-flex flex-col'>
      <CardHeader>
        <CardTitle className='text-center'>Budget vs Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <GaugeChart filled={20}>
          <div className='flex items-center justify-center flex-col'>
            <p className='text-lg text-[#5d5d5d]'>₹ 5000</p>
            <p className='text-xs text-[#5d5d5d]'>of 10000</p>
          </div>
        </GaugeChart>
      </CardContent>
    </Card>
  );
}
