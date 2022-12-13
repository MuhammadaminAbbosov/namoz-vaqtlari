import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import axios from "axios";
import CalendarIcon from "./assets/calendar.png";
import TongIcon from "./assets/Tong.png";
import SunIcon from "./assets/Quyosh.png";
import PeshinIcon from "./assets/Peshin.png";
import AsrIcon from "./assets/Asr.png";
import ShomIcon from "./assets/Shom.png";
import XuftonIcon from "./assets/Xufton.png";

function App() {
  const [city, setCity] = useState("Toshkent");
  const [data, setData] = useState([]);
  const [time, setTime] = useState(
    `${
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : new Date().getHours()
    }:${
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes()
    }:${
      new Date().getSeconds() < 10
        ? `0${new Date().getSeconds()}`
        : new Date().getSeconds()
    }`
  );

  const handleChange = (value) => {
    setCity(value);
  };
  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "April",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  let weekDays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  useEffect(() => {
    // document.addEventListener("contextmenu", (e) => {
    //   e.preventDefault();
    // });

    setInterval(() => {
      setTime(
        `${
          new Date().getHours() < 10
            ? `0${new Date().getHours()}`
            : new Date().getHours()
        }:${
          new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()
        }:${
          new Date().getSeconds() < 10
            ? `0${new Date().getSeconds()}`
            : new Date().getSeconds()
        }`
      );
    }, 1000);

    axios
      .get(`https://islomapi.uz/api/present/day?region=${city}`)
      .then((res) => {
        setData([
          {
            id: 0,
            title: "Bomdod",
            icon: TongIcon,
            time: res.data.times.tong_saharlik,
          },
          {
            id: 1,
            title: "Quyosh",
            icon: SunIcon,
            time: res.data.times.quyosh,
          },
          {
            id: 2,
            title: "Peshin",
            icon: PeshinIcon,
            time: res.data.times.peshin,
          },
          {
            id: 3,
            title: "Asr",
            icon: AsrIcon,
            time: res.data.times.asr,
          },
          {
            id: 4,
            title: "Shom",
            icon: ShomIcon,
            time: res.data.times.shom_iftor,
          },
          {
            id: 5,
            title: "Xufton",
            icon: XuftonIcon,
            time: res.data.times.hufton,
          },
        ]);
      });
  }, [city]);

  const renderItem = (item) => {
    console.log(item.time.split(":")[0] >= new Date().getHours());
    return (
      <div
        className={`card ${
          item.time.split(":")[0] >= new Date().getHours() &&
          item.time.split(":")[1] >= new Date().getMinutes() &&
          "active"
        }`}
        key={("card-", item.id)}
      >
        <b>{item.title}</b>
        <img src={item.icon} alt="" />
        <p>{item.time}</p>
      </div>
    );
  };

  return (
    <Wrapper>
      <h1>Namoz Vaqtlari</h1>
      <hr />
      <div className="regions">
        <b>Hududni tanlang:</b>
        <Select
          defaultValue="Toshkent"
          onChange={handleChange}
          className="select"
          options={[
            {
              value: "Andijon",
              label: "Andijon",
            },
            {
              value: "Buxoro",
              label: "Buxoro",
            },
            {
              value: "Farg'оna",
              label: "Farg'оna",
            },
            {
              value: "Guliston",
              label: "Guliston",
            },
            {
              value: "Jizzax",
              label: "Jizzax",
            },
            {
              value: "Namangan",
              label: "Namangan",
            },
            {
              value: "Navoiy",
              label: "Navoiy",
            },
            {
              value: "Nukus",
              label: "Nukus",
            },
            {
              value: "Qarshi",
              label: "Qarshi",
            },
            {
              value: "Samarqand",
              label: "Samarqand",
            },
            {
              value: "Termiz",
              label: "Termiz",
            },
            {
              value: "Toshkent",
              label: "Toshkent",
            },
            {
              value: "Xiva",
              label: "Xiva",
            },
          ]}
        />
      </div>

      <div className="box">
        <div className="city-box">
          <p>
            Mintaqa: <span>{city} shahri</span>
          </p>
        </div>
        <div className="time-box">
          <img src={CalendarIcon} alt="" />
          <div className="day-box">
            <p>
              {weekDays[new Date().getDay()]}, {new Date().getDate()}-
              {months[new Date().getMonth()]}
            </p>
            <p>
              {new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
                day: "numeric",
                month: "long",
                weekday: "long",
                year: "numeric",
              }).format(Date.now())}
            </p>
          </div>
          <p className="hour-text">{time}</p>
        </div>
      </div>
      <div className="cards">{data.map((item) => renderItem(item))}</div>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  h1 {
    font-size: 36px;
    color: white;
  }

  hr {
    height: 3px;
    background-color: white;
    width: 60%;
    margin: 20px 0;
  }

  .regions {
    display: flex;
    align-items: center;
    gap: 100px;
    margin-bottom: 40px;
    @media (max-width: 425px) {
      gap: 20px;
    }

    b {
      color: white;
      font-size: 24px;
      @media (max-width: 425px) {
        font-size: 18px;
      }
    }

    .select {
      width: 200px;
    }
  }

  .box {
    display: flex;
    align-items: center;
    gap: 400px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      gap: 20px;
      flex-direction: column;
    }

    .city-box {
      p {
        font-size: 24px;
        color: white;
        font-weight: 600;
        span {
          color: #ffc700;
        }
      }
    }

    .time-box {
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 50px;
        height: 50px;
      }

      .day-box {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
          font-size: 18px;
          color: white;
          font-weight: 600;

          @media (max-width: 768px) {
            font-size: 14px;
          }
          &:first-child {
            color: #ffc700;
            @media (max-width: 768px) {
              font-size: 18px;
            }
          }
        }
      }

      .hour-text {
        font-size: 36px;
        color: white;
        font-weight: 600;
        @media (max-width: 425px) {
          font-size: 20px;
        }
      }
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 25px;
    width: 100%;

    @media (max-width: 425px) {
      grid-template-columns: repeat(3, 1fr);
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 16px;
      padding: 15px 30px;
      @media (max-width: 425px) {
        padding: 5px 10px;
      }

      &.active {
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 40px white;
        transform: scale(1.04);

        b,
        p {
          color: #008653;
        }
      }
      img {
        width: 150px;
        @media (max-width: 425px) {
          width: 50px;
        }
      }

      b {
        color: #ffc700;
        font-size: 36px;
        @media (max-width: 425px) {
          font-size: 20px;
        }
      }
      p {
        color: white;
        font-size: 36px;
        font-weight: 600;
        @media (max-width: 425px) {
          font-size: 20px;
        }
      }
    }
  }
`;
