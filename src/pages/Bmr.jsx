import bmr from "./../assets/bmr.png";
import { Link } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import Footer from "./../components/Footer";

export default function Bmr() {
  // สร้าง state สำหรับเก็บค่าที่ผู้ใช้กรอก
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("m");
  const [bmrValue, setBmrValue] = useState("0.00");

  //สร้างฟังก์ชัน คำนวณ BMR ------------
  const handleCalBmrClick = (e) => {
    e.preventDefault();

    //Validate UI
    if (weight === "" || height === "" || age === "") {
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
    const h = Number(height);
    const a = Number(age);
    let bmrResult;

    if (gender === "m") {
      bmrResult = 66 + 13.7 * w + 5 * h - 6.8 * a;
    } else {
      bmrResult = 655 + 9.6 * w + 1.8 * h - 4.7 * a;
    }

    //นำผลที่ได้ไปกำหนดให้กับ state bmrValue เพื่อแสดงผลต่อไป
    setBmrValue(bmrResult.toFixed(2));
  };

  //สร้างฟังก์ชัน reset ค่าบน component
  const handleResetClick = (e) => {
    e.preventDefault();

    setWeight("");
    setHeight("");
    setAge("");
    setGender("m");
    setBmrValue("0.00");
  };

  return (
    <>
      <div className="font-kanit min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg flex flex-col items-center">
          {/* แสดงชื่อคำนวณ */}
          <h1 className="text-3xl  text-center ">BMR Calculater</h1>
          <p className="text-lg  text-center text-gray-700">
            คำนวณค่า BMR
          </p>

          {/* แสดงรูป */}
          <img src={bmr} alt="bmr" className="mt-5 w-30" />

          {/* ส่วนของฟอร์ม */}
          <form className="w-full flex flex-col">
            <label className=" font-semibold mt-2 text-gray-700">
              ป้อนน้ำหนัก (กิโลกรัม)
            </label>
            <input
              type="number"
              placeholder="น้ำหนัก" //ใส่ placeholder เพื่อให้ผู้ใช้รู้ว่าต้องกรอกอะไร
              value={weight} //เชื่อมกับ state weight
              onChange={(e) => setWeight(e.target.value)} //เมื่อผู้ใช้กรอกข้อมูลให้เปลี่ยนค่า state weight
              className="border border-gray-200 rounded-sm p-2 shadow-sm mt-2"
            />

            <label className=" font-semibold mt-2 text-gray-700">
              ป้อนส่วนสูง (เซนติเมตร)
            </label>
            <input
              type="number"
              placeholder="ส่วนสูง"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border border-gray-200 rounded-sm p-2 shadow-sm mt-2"
            />

            <label className=" font-semibold mt-2 text-gray-700">
              ป้อนอายุ (ปี)
            </label>
            <input
              type="number"
              placeholder="อายุ"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-200 rounded-sm p-2 shadow-sm mt-2"
            />

            <p className="font-semibold  text-gray-700 mt-4">เพศ</p>
            <div className="flex items-center">
              <input className="w-5 h-5 border-none ring-2 ring-white  mt-2" type="radio"
                name="gender"
                value="m"
                checked={gender === "m"}
                onChange={(e) => setGender(e.target.value)} />
              <label className="ml-2 mt-2 font-semibold  text-gray-700" for="radio-metric">ชาย</label>
            </div>
            <div className="flex items-center">
              <input className="w-5 h-5 border-none ring-2 ring-white mt-2" type="radio"
                name="gender"
                value="f"
                checked={gender === "f"}
                onChange={(e) => setGender(e.target.value)} />
              <label className="ml-2 mt-2 font-semibold  text-gray-700" for="radio-metric">หญิง</label>
            </div>

            <div className="flex justify-center gap-10 ">
              <button onClick={handleCalBmrClick} type="button" className="w-full bg-lime-700 text-white p-2 mt-5 rounded-sm font-semibold hover:bg-lime-800 cursor-pointer shadow-sm">
                คำนวณ
              </button>

              <button onClick={handleResetClick}
                type="button" className="w-full bg-red-500 text-white p-2 mt-5 rounded-sm font-semibold hover:bg-red-600 cursor-pointer shadow-sm">
                รีเซ็ต
              </button>
            </div>

          </form>

          {/* ส่วนแสดงผล */}
          <div className="flex items-center justify-center mt-5 gap-5">
            <p className="font-kanit font-semibold mt-5">ค่า BMR ที่คำนวณได้</p>
            <span className="font-kanit font-semibold mt-5 text-blue-600"> {bmrValue}</span>
          </div>
          {/* กลับหน้า */}
          <Link to="/" className="w-full text-center bg-gray-400 text-white p-2 mt-4 rounded-sm font-semibold shadow-sm">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Footer />
      </div>
    </>
  );
}