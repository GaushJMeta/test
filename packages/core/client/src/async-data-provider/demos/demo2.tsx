import { APIClient, APIClientProvider, SchemaComponent, SchemaComponentProvider, useRequest } from '@nocobase/client';
import { Table } from 'antd';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';

const apiClient = new APIClient();

const mock = new MockAdapter(apiClient.axios);

mock.onGet('/users').reply(200, {
  data: [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Mike' },
  ],
});

const TableView = (props) => {
  const { request, ...others } = props;
  const callback = () => props.dataSource || [];
  const { data, loading } = useRequest<{
    data: any;
  }>(props.request || callback);
  return <Table {...others} dataSource={data?.data} loading={loading} />;
};

export default () => {
  return (
    <APIClientProvider apiClient={apiClient}>
      <SchemaComponentProvider components={{ TableView }}>
        <SchemaComponent
          schema={{
            type: 'void',
            name: 'tableView',
            'x-component': 'TableView',
            'x-component-props': {
              request: { url: '/users' },
              rowKey: 'id',
              columns: [
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                },
              ],
            },
          }}
        />
      </SchemaComponentProvider>
    </APIClientProvider>
  );
};
