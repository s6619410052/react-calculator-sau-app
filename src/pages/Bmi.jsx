import bmi from "./../assets/bmi.png";
import { Link } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import Footer from "./../components/Footer";

export default function Bmi() {
  // สร้าง state สำหรับเก็บค่าที่ผู้ใช้กรอก
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiValue, setBmiValue] = useState("0.00");

  // สร้างฟังก์ชัน คำนวณ BMI ------------
  const handleCalBmiClick = (e) => {
    e.preventDefault();

    //Validate UI
    if (weight === "" || height === "") {
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
      });

      return;
    }
    //พร้อมคำนวณ แต่ต้องแปลง state ที่จะต้องใช้ในการคำนวณให้เป็นตัวเลขก่อน
    const w = Number(weight);
    const h = Number(height) / 100;
    const bmi = w / (h * h);
    //นำผลที่ได้ไปกำหนดให้กับ state bmiValue เพื่อแสดงผลต่อไป
    setBmiValue(bmi.toFixed(2));
  };

  // สร้างฟังก์ชัน รีเซ็ตข้อมูล ------------
  const handleResetClick = () => {

    setWeight("");
    setHeight("");
    setBmiValue("0.00");
  };

  return (
    <>
      <div className="w-200 mt-40 mx-auto border-2 border-gray-100  shadow-2xl flex flex-col items-center p-15 ">
        {/* แสดงชื่อคำนวณ */}
        <p className="text-3xl font-kanit text-center">BMI (ดัชนีมวลกาย)</p>
        <p className="text-lg font-kanit text-center text-gray-700">
          คำนวณค่าดัชนีมวลกาย
        </p>

        {/* แสดงรูป */}
        <img src={bmi} alt="bmi" className="mt-5 w-30" />

        {/* ส่วนของฟอร์ม */}
        <form className="w-full flex flex-col">
          <label className="font-kanit font-bold ">
            ป้อนน้ำหนัก (กิโลกรัม)
          </label>
          <input
            type="number"
            placeholder="น้ำหนัก"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-500 rounded-sm p-2"
          />

          <label className="font-kanit font-bold ">
            ป้อนส่วนสูง (เซนติเมตร)
          </label>
          <input
            type="number"
            placeholder="ส่วนสูง"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-500 rounded-sm p-2"
          />

          <button
            type="button"
            onClick={handleCalBmiClick}
            className="bg-blue-600 text-white p-2 mt-5 rounded-sm font-kanit font-bold hover:bg-blue-800 cursor-pointer"
          >
            คำนวณ
          </button>

          <button
            type="button"
            onClick={handleResetClick}
            className="bg-gray-400 text-white p-2 mt-2 rounded-sm font-kanit font-bold hover:bg-gray-600 cursor-pointer"
          >
            รีเซ็ต
          </button>
        </form>

        {/* ส่วนแสดงผล */}
        <div className="flex items-center justify-center mt-5 gap-5">
          <p className="font-kanit font-bold mt-5">ค่า BMI ที่คำนวณได้</p>
          <p className="font-kanit font-bold mt-5 text-blue-600">{bmiValue}</p>
        </div>
        {/* กลับหน้า */}
        <Link to="/" className="w-full text-center bg-gray-400 text-white p-2 mt-4 rounded-sm font-kanit font-bold">
          กลับหน้าหลัก
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Footer />
      </div>
    </>
  );
}