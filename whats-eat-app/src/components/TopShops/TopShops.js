import React from "react";
import "./TopShop.css";
import ShopCard from "../ShopCard/ShopCard";

const TopShops = () => {
  return (
    <div className="top-shop-container">
      <div className="top-shop">
        <h1 className="title">Khám phá thêm</h1>
        <div className="shop-card-container">
          {mock_data.map((item, idx) => {
            return <ShopCard key={idx} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TopShops;

const mock_data = [
  {
    id: 1,
    shopName: "TOPMEAL",
    avtUrl:
      "https://salt.tikicdn.com/cache/200x200/ts/seller/b6/a2/73/128c9ce382796619e360d14814d649c6.jpg.webp",
    ratingAvg: 4.5,
    totalRate: 965,
    products: [
      {
        productId: 1,
        name: "Dừa xiêm bến tre",
        basePrice: 22000,
        weightServing: "1 trái",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/2853/s/04c1974d-ef9c-46a1-a280-b99379ac3839.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Cóc non",
        basePrice: 22000,
        weightServing: "500g",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/3783/s/b319eaf1-dcd9-42ef-a067-6240f62beb08.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Xoài keo",
        basePrice: 27000,
        weightServing: "1.1 - 1.3kg",
        images: [
          [
            {
              url: "	https://image.cooky.vn/posproduct/g0/3112/s/c64137df-6bd2-4400-b042-ac88b8157a60.jpeg",
            },
          ],
        ],
      },
    ],
  },
  {
    id: 2,
    shopName: "Đảo Hải Sản",
    avtUrl:
      "	https://salt.tikicdn.com/cache/200x200/ts/seller/9c/7c/b8/1cdfebaa1ee1ed7f861dcbd407e30a78.jpg.webp",
    ratingAvg: 4.7,
    totalRate: 3800,
    products: [
      {
        productId: 1,
        name: "Dừa xiêm bến tre",
        basePrice: 22000,
        weightServing: "1 trái",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/2853/s/04c1974d-ef9c-46a1-a280-b99379ac3839.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Cóc non",
        basePrice: 22000,
        weightServing: "500g",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/3783/s/b319eaf1-dcd9-42ef-a067-6240f62beb08.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Xoài keo",
        basePrice: 27000,
        weightServing: "1.1 - 1.3kg",
        images: [
          [
            {
              url: "	https://image.cooky.vn/posproduct/g0/3112/s/c64137df-6bd2-4400-b042-ac88b8157a60.jpeg",
            },
          ],
        ],
      },
    ],
  },
  {
    id: 3,
    shopName: "Hải Sản Đại Dương Xanh",
    avtUrl:
      "https://salt.tikicdn.com/cache/200x200/ts/seller/d8/d5/cc/4f04fa2a292b7d2e1145e7d2258e3112.png.webp",
    ratingAvg: 4.8,
    totalRate: 20,
    products: [
      {
        productId: 1,
        name: "Dừa xiêm bến tre",
        basePrice: 22000,
        weightServing: "1 trái",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/2853/s/04c1974d-ef9c-46a1-a280-b99379ac3839.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Cóc non",
        basePrice: 22000,
        weightServing: "500g",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/3783/s/b319eaf1-dcd9-42ef-a067-6240f62beb08.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Xoài keo",
        basePrice: 27000,
        weightServing: "1.1 - 1.3kg",
        images: [
          [
            {
              url: "	https://image.cooky.vn/posproduct/g0/3112/s/c64137df-6bd2-4400-b042-ac88b8157a60.jpeg",
            },
          ],
        ],
      },
    ],
  },
  {
    id: 4,
    shopName: "Grove Fresh",
    avtUrl:
      "https://salt.tikicdn.com/cache/200x200/ts/seller/3f/96/d5/e81c134abc998bb05c88bacc89945151.jpg.webp",
    ratingAvg: 4.8,
    totalRate: 1200,
    products: [
      {
        productId: 1,
        name: "Dừa xiêm bến tre",
        basePrice: 22000,
        weightServing: "1 trái",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/2853/s/04c1974d-ef9c-46a1-a280-b99379ac3839.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Cóc non",
        basePrice: 22000,
        weightServing: "500g",
        images: [
          [
            {
              url: "https://image.cooky.vn/posproduct/g0/3783/s/b319eaf1-dcd9-42ef-a067-6240f62beb08.jpeg",
            },
          ],
        ],
      },
      {
        productId: 1,
        name: "Xoài keo",
        basePrice: 27000,
        weightServing: "1.1 - 1.3kg",
        images: [
          [
            {
              url: "	https://image.cooky.vn/posproduct/g0/3112/s/c64137df-6bd2-4400-b042-ac88b8157a60.jpeg",
            },
          ],
        ],
      },
    ],
  },
];
