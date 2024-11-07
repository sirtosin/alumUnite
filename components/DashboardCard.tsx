import React from 'react'
import Card from './Card'

interface Props {
  title: string;
  color: string;
  number:number
}

export default function DashboardCard({ title, color, number }: Props) {
  return (
    <div>
      <Card>
        <aside
          style={{
            background: color,
          }}
          className="w-[208px] h-[130px] space-y-6 p-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[#303B54] font-semibold">{title}</h2>
            <p
              style={{
                background: color,
              }}
              className="size-6 rounded p-2"
            />
          </div>
          <div className="space-y-1 flex-col flex">
            <h2 className="text-[#434854] font-semibold text-2xl">{number}</h2>
          </div>
        </aside>
      </Card>
    </div>
  );
}