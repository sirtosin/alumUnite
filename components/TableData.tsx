import React from 'react'
import Card from './Card';
import SkeletonTable from "./skeleton/Table";
import Paginate from "./table/table";
import { SearchField } from './Search';

interface Props {
  title: string;
  data: any;
  loading: boolean;
  dropdown: string[];
  inputText: string;
  setInputText:(e:any) => void
}

export default function TableData({ title, data, dropdown, inputText, setInputText }: Props) {
  return (
    <>
      <h2 className="text-[#A4A7B7]">{title}</h2>
      <section>
        <Card>
          <div className="w-full overflow-auto sm:overflow-hidden my-3 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#98989A] p-5 sm:p-10">
            {" "}
            <SearchField inputText={inputText} setInputText={setInputText} />
            {false ? (
              <SkeletonTable />
            ) : data?.length > 0 ? (
              <>
                <Paginate data={data} dropdown={dropdown} />
              </>
            ) : (
              <p className="text-[#98989A] text-xl text-center capitalize font-medium">
                no data
              </p>
            )}
          </div>
        </Card>
      </section>
    </>
  );
}
