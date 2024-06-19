import React from 'react';
import { Tabs, Form, Input, Button, List } from 'antd';

const { TabPane } = Tabs;

const TeacherContent = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Hazırlanan Sınavlar" key="1">
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
        <Form layout="vertical">
          <Form.Item label="Grup Adı">
            <Input placeholder="Grup adı giriniz" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Grup Ekle</Button>
          </Form.Item>

        </Form>
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
      <TabPane tab="Dersler" key="3">
        <Form layout="vertical">
          <Form.Item label="Test Adı">
            <Input placeholder="Ders adı giriniz" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Ders Oluştur</Button>
          </Form.Item>
        </Form>
        <List
          itemLayout="horizontal"
          dataSource={['Ders 1', 'Ders 2', 'Ders 3']}
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
    </Tabs>
  );
};

export default TeacherContent;
