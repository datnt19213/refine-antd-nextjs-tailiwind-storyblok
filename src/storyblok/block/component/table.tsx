import React, { useEffect } from 'react';

import { Loader2 } from 'lucide-react';

import {
  Table as Tb,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getReviewList } from '@/services';
import { getHappiness } from '@/services/directus';
import { useTable } from '@refinedev/antd';

const Table = ({ block }: any) => {
  useEffect(() => {
    const fetchData = async () => {
      const resReview = await getReviewList();
      const resDirectus = await getHappiness();
      console.log(resReview);
    };
    fetchData();
  }, [])

  const happinessTable = useTable({
    resource: "happiness",
  });
  const reviewTable = useTable({
    resource: "review",
  });

  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className="p-4 rounded-lg bg-white w-full mt-3">
        {block.label === "All of Happiness" && (
          <div className="flex flex-col gap-3 w-full">
            <span className="font-semibold text-xl" >{block.label}</span>
            <Tb key={block._uid}>
              <TableCaption>{block.label}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Country_or_region</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">GDP_per_capita</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {happinessTable.tableProps.dataSource?.map((item: any, index: number) => (
                  <TableRow key={item.id} className='animate-in fade-in-0'>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.Country_or_region}</TableCell>
                    <TableCell>{item.Score}</TableCell>
                    <TableCell className="text-right">{item.GDP_per_capita}</TableCell>
                  </TableRow>
                ))}
                {
                  happinessTable.tableProps.loading && (
                    <TableRow >
                      <TableCell colSpan={4} className='text-center'>
                        <Loader2 className='animate-spin m-auto' />
                      </TableCell>
                    </TableRow>
                  )
                }
                {
                  (happinessTable.tableProps.dataSource?.length === 0 || !happinessTable.tableProps.dataSource) && !happinessTable.tableProps.loading && (
                    <TableRow >
                      <TableCell colSpan={4} className='text-center'>
                        No data
                      </TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Tb>
          </div>
        )}
        {block.label === "All of Surveys" && (
          <div className="flex flex-col gap-3 w-full">
            <span className="font-semibold text-xl" >{block.label}</span>
            <Tb key={block._uid}>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>totalClap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviewTable.tableProps.dataSource?.map((item: any) => (
                  <TableRow key={item.id} className='animate-in fade-in-0'>
                    <TableCell>{item.data.email}</TableCell>
                    <TableCell>{item.data.comment}</TableCell>
                    <TableCell>{item.data.totalClap}</TableCell>
                  </TableRow>
                ))}
                {
                  reviewTable.tableProps.loading && (
                    <TableRow >
                      <TableCell colSpan={3} className='text-center'>
                        <Loader2 className='animate-spin m-auto' />
                      </TableCell>
                    </TableRow>
                  )
                }
                {
                  (reviewTable.tableProps.dataSource?.length === 0 || !reviewTable.tableProps.dataSource) && !reviewTable.tableProps.loading && (
                    <TableRow >
                      <TableCell colSpan={3} className='text-center'>
                        No data
                      </TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Tb>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
