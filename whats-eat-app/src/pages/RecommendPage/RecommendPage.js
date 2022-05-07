import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import Footer from "../../components/Footer/Footer";
import Recommender from "../../components/Recommender/Recommender";
import "./RecommendPage.css";
import ModalCalo from "../../components/ModalCalCalo/ModalCalo"
const RecommendPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [kcal, setKcal] = useState(0);
  const token = useSelector((state) => state.auth.userInfo.token)
  const handleOk = (year, gender, pal) => {

    console.log(year,gender,pal);
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/get-calo-per-day?YearOfBirth=${year}&gender=${gender}&pAL=${pal}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setKcal(res.data)
      })
      .catch((err) => {
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="recommend">
      <Recommender kcal={kcal} />
      <Footer />
      <ModalCalo isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default RecommendPage;
