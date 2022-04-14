import React from "react";
import "./Guide.css";

const steps = [
  {
    id: 1,
    content:
      "Loại bỏ vỏ chuối, vỏ kiwi, vỏ xoài chín. Sau đó, cắt trái cây thành từng khoanh mỏng. Cho vào ngăn đá tủ lạnh ít nhất 2 tiếng.",
    img_list: [
      {
        img_id: 1,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102378373968618.png",
      },
      {
        img_id: 2,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102378372508476.png",
      },
    ],
  },
  {
    id: 2,
    content:
      "Củ dền gọt bỏ vỏ, cắt khối vuông. Yến mạch bạn có thể sử dụng loại nguyên chất hoặc rang đường nâu đều được.",
    img_list: [
      {
        img_id: 1,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102379797673115.png",
      },
      {
        img_id: 2,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102379793382655.png",
      },
    ],
  },
  {
    id: 3,
    content:
      "Sau khi trái cây đông đá, cho tất cả vào máy xay bao gồm 350 gram chuối, 200 gram xoài chín, 200 gram kiwi vào xay mịn. Smoothie sẽ có màu vàng nhạt. Để smoothie có màu hồng, bạn có thể cho thêm củ dền vào nhé!",
    img_list: [
      {
        img_id: 1,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102382565212973.png",
      },
      {
        img_id: 2,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102382565042867.png",
      },
    ],
  },
  {
    id: 4,
    content:
      "Sau khi xay mịn, cho hỗn họp ra tô. Trang trí phần trái cây cắt lát còn lại, hạt chia và yến mạch tùy theo sở thích.",
    img_list: [
      {
        img_id: 1,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102383900220414.jpg",
      },
      {
        img_id: 2,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102383900370455.jpg",
      },
      {
        img_id: 3,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102383907182005.png",
      },
      {
        img_id: 4,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102383907752353.png",
      },
    ],
  },
  {
    id: 5,
    content:
      "Hãy bảo quản món ăn này trong ngăn đông để chúng tươi lâu hơn nhé. Bây giờ thưởng thức thôi. Trái cây chua ngọt đậm đà tự nhiên không cần đường, hòa cùng trái cây tươi mát lạnh, thêm ít yến mạch và hạt chia bổ dưỡng mát lạnh. Hãy sáng tạo và duy trì thói quen ăn món smoothie này để có một vóc dáng đẹp và một sức khỏe tốt nhé! Chúc các bạn thành công!",
    img_list: [
      {
        img_id: 1,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102386553333084.png",
      },
      {
        img_id: 2,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102386553433406.png",
      },
      {
        img_id: 3,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102386545572670.png",
      },
      {
        img_id: 4,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102386546242767.png",
      },
      {
        img_id: 5,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102386545342968.png",
      },
      {
        img_id: 6,
        img_url:
          "https://image.cooky.vn/recipe/g6/50880/s240x240/cooky-recipe-637102386545352910.png",
      },
    ],
  },
];

const Guide = () => {
  return (
    <div className="guide-container">
      <h1 className="title">Hướng dẫn thực hiện</h1>
      <div className="guide-box">
        {steps.map((step, idx) => {
          const { content, photos } = step;
          return (
            <div className="step-container" key={idx}>
              <span className="step-number">{idx + 1}.</span>
              <div className="step-content">
                <p>{content}</p>
                <div className="img-box">
                  {photos?.map((image, idx) => {
                    return (
                      <div className="img" key={idx}>
                        <img src={image.url} alt="whatseat" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Guide;
