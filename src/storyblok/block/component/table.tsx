import React from 'react';

import { Button } from 'antd';
import {
  Loader2,
  PenLine,
  Trash,
} from 'lucide-react';
import Link from 'next/link';

import {
  Table as Tb,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTable } from '@refinedev/antd';
import { useDelete } from '@refinedev/core';

const Table = ({ block }: any) => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const resReview = await getReviewList();
  //     const resDirectus = await getHappiness();
  //     console.log(resReview);
  //   };
  //   fetchData();
  // }, [])

  const happinessTable = useTable({
    resource: "happiness",
  });
  const reviewTable = useTable({
    resource: "review",
  });
  const happinessDelete = useDelete();

  function handleDeleteRow(id: any) {

    if (confirm(`Are you sure to delete this data: ${id}`)) {

      happinessDelete.mutate({
        resource: "happiness",
        id: id,
      }, {
        onSuccess: () => {
          happinessTable.tableQuery.refetch();
        },
      });
    }

  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className="p-4 rounded-lg bg-white w-full mt-3">
        {block.label === "All of Happiness" && (
          <div className="flex flex-col gap-3 w-full">
            <div className='flex justify-between gap-3'>
              <span className="font-semibold text-xl" >{block.label}</span>
              <Link href="/dashboard/create"><Button>Create</Button></Link>
            </div>
            <Tb key={block._uid}>
              <TableCaption>{block.label}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Country_or_region</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>GDP_per_capita</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {happinessTable.tableProps.dataSource?.map((item: any, index: number) => (
                  <TableRow key={item.id} className='animate-in fade-in-0'>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.Country_or_region}</TableCell>
                    <TableCell>{item.Score}</TableCell>
                    <TableCell>{item.GDP_per_capita}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Link href={`/dashboard/edit?${item.id}`}>
                        <Button variant='outlined' className='w-10 h-10 !p-2 aspect-square'>
                          <PenLine size={20} />
                        </Button>

                      </Link>

                      <Button variant='outlined' className='w-10 h-10 !p-2 aspect-square hover:!border-red-500 hover:!text-red-500' onClick={() => {
                        // console.log(item.id);
                        handleDeleteRow(item.id);
                      }}>
                        <Trash size={20} />
                      </Button>
                    </TableCell>
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
