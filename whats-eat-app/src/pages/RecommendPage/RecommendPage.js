import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Recommender from "../../components/Recommender/Recommender";
import "./RecommendPage.css";
import ModalCalo from "../../components/ModalCalCalo/ModalCalo";
const RecommendPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [kcal, setKcal] = useState(0);
  const [menu, setMenu] = useState([])
  const user = useSelector((state) => state.auth.userInfo);
  const handleOk = (gender, pal, weight, height, year) => {
    console.log(gender, pal, weight, height, year);
    const body = {
      gender: gender,
      pal: pal,
      weight: weight,
      height: height,
      year: year
    }
    axios({
      method: "put",
      url: `https://localhost:7029/api/Customer/update-calo-per-day`,
      data: body,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setKcal(res.data);
        if(res.data > 0){
          getRecommendedRecipe(res.data);
        }
      })
      .catch((err) => { });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getRecommendedRecipe = (kcal) => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/individual/recipe/?id_user=${user.userId}&user_kcal=${kcal}&n_recipe=16`,
    })
      .then((res) => {
        const result = res.data;
        setMenu(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Customer/get-calo-per-day`,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setKcal(res.data);
        if(res.data > 0){
          getRecommendedRecipe(res.data);
        }
      })
      .catch((err) => { });
  }, [])

  return (
    <div className="recommend">
      <Recommender kcal={kcal} menu={menu} />
      <Footer />
      {kcal === 0 && <ModalCalo
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />}
    </div>
  );
};

export default RecommendPage;
