"use client";
import React from 'react';

import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
} from 'antd';
import { usePathname } from 'next/navigation';

import { useCreate } from '@refinedev/core';

const { RangePicker } = DatePicker;

const Create = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean); // Tách các phần của đường dẫn

  const isCreatePage = pathSegments?.[pathSegments.length - 1] === "create"; // Kiểm tra nếu cuối là "create"
  const parentSegment = pathSegments?.[pathSegments.length - 2];

  const [form] = Form.useForm();
  const create = useCreate()
  function onFinish(values: any) {
    create.mutate({
      resource: "happiness",
      values: values,
      meta: {
        parent: parentSegment
      }
    }, {
      onSuccess: () => {
        console.log("Created successfully");
        form.resetFields();
      },
    });
  } return (
    <>
      {isCreatePage && <Form
        form={form}
        variant="outlined"
        className='!min-w-[600px]'
        onFinish={onFinish}
      >
        <Flex gap={8} className="!w-full" >
          <Form.Item
            name="Overall_rank"
            label="Overall rank"
            rules={[{ required: true }]}
            className="!w-full"
          >
            <Input placeholder="Overall rank" />
          </Form.Item>
          <Form.Item
            label="Country or region"
            name="Country_or_region"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="Country or region" />
          </Form.Item>
        </Flex>
        <Flex gap={8} className="!w-full" >
          <Form.Item

            label="Score"
            name="Score"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="Score" />
          </Form.Item>
          <Form.Item
            label="GDP per capita"
            name="Gdp_per_capita"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="GDP per capita" />
          </Form.Item>
        </Flex>
        <Flex gap={8} className="!w-full" >
          <Form.Item
            label="Social support"
            name="Social_support"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="Social support" />
          </Form.Item>
          <Form.Item
            label="Healthy life expectancy"
            name="Healthy_life_expectancy"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="Health life expectancy" />
          </Form.Item>
        </Flex>
        <Flex gap={8} className="!w-full" >
          <Form.Item
            label="Freedom to make life choices"
            name="Freedom_to_make_life_choices"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="Freedom to make life choices" />
          </Form.Item>
          <Form.Item
            label="Generosity"
            name="Generosity"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="Generosity" />
          </Form.Item>
        </Flex>
        <Flex gap={8} className="!w-full" >
          <Form.Item
            label="Perceptions of corruption"
            name="Perceptions_of_corruption"
            rules={[{ required: true }]}
            className="!w-full"

          >
            <Input placeholder="Perceptions of corruption" />
          </Form.Item>
        </Flex>
        <Form.Item className='flex justify-center'>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>}
    </>
  )
};

export default Create;
