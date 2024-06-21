import React from "react";
import { Modal, List } from "antd";

const ExamPreview = ({ exam, visible, onClose }) => {
  return (
    <Modal
      title={`${exam.ders_kodu} - ${exam.sinav_adi}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <p><strong>Çözülme Tarihi:</strong> {new Date(exam.cozulme_tarihi).toLocaleString()}</p>
      <List
        header={<div>Sorular ve Verilen Cevaplar</div>}
        bordered
        dataSource={exam.cevaplar}
        renderItem={(answer, index) => (
          <List.Item key={index}>
            <strong>{exam.sorular[index].soru_metni}</strong><br/>
            <p>{answer}</p>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ExamPreview;
