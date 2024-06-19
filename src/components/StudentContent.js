import React from 'react';
import { Tabs, List,Form, Input, Button } from 'antd';

const { TabPane } = Tabs;

const StudentContent = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Çözülen Sınavlar" key="1">
        <List
          itemLayout="horizontal"
          dataSource={['Sınav 1', 'Sınav 2', 'Sınav 3']}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="#">{item}</a>}
                description="Sınav açıklaması burada olacak."
              />
            </List.Item>
          )}
        />
      </TabPane>
      <TabPane tab="Gruplar" key="2">
      <Form.Item label="Grup Adı">
            <Input placeholder="Grup adı giriniz" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Gruba katıl</Button>
          </Form.Item>
        <List
          itemLayout="horizontal"
          dataSource={['Grup 1', 'Grup 2', 'Grup 3']}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="#">{item}</a>}
                description="Grup açıklaması burada olacak."
              />
            </List.Item>
          )}
        />
      </TabPane>
    </Tabs>
  );
};

export default StudentContent;
