import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Recommender from "../../components/Recommender/Recommender";
import "./RecommendPage.css";
import ModalCalo from "../../components/ModalCalCalo/ModalCalo"
const RecommendPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = (year, gender, pal) => {
    console.log(year,gender,pal);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="recommend">
      <Recommender />
      <Footer />
      <ModalCalo isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default RecommendPage;
