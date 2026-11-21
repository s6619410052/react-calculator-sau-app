import car from "./../assets/car.png";
import { Link } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import Footer from "./../components/Footer";

export default function Car() {
  // สร้าง state
  const [userName, setUserName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [downPct, setDownPct] = useState("");
  const [interestPct, setInterestPct] = useState("");
  const [months, setMonths] = useState("84");
  const [monthlyPay, setMonthlyPay] = useState("0.00");

  // ฟังก์ชันคำนวณค่างวดรถ
  const handleCalCarClick = (e) => {
    e.preventDefault();
    // Validate UI
    if (carPrice === "" || downPct === "" || interestPct === "" || months === "") {
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    // แปลงค่าเป็นตัวเลข
    const price = Number(carPrice);
    const down = Number(downPct);
    const interest = Number(interestPct);
    const m = Number(months);

    // ขั้นตอนการคำนวณ
    const downAmount = price * (down / 100);
    const financeAmount = price - downAmount;
    const totalInterest = financeAmount * (interest / 100) * (m / 12);
    const totalPay = financeAmount + totalInterest;
    const installment = totalPay / m;

    setMonthlyPay(
      installment.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  // ฟังก์ชัน Reset ค่า
  const handleResetClick = (e) => {
    e.preventDefault();

    setUserName("");
    setCarPrice("");
    setDownPct("");
    setInterestPct("");
    setMonths("84"); // รีเซ็ตกลับเป็น 84 เดือน
    setMonthlyPay("0.00");
  };
  return (
    <>
      <div className="w-200 mt-40 mx-auto border-2 border-gray-100  shadow-2xl flex flex-col items-center p-15 ">
        {/* แสดงชื่อคำนวณ */}
        <p className="text-3xl font-kanit text-center">Car Installment Calculater</p>
        <p className="text-lg font-kanit text-center text-gray-700">
          คำนวณ Car Installment
        </p>

        {/* แสดงรูป */}
        <img src={car} alt="car" className="mt-5 w-30" />

        {/* ส่วนของฟอร์ม */}
        <form className="w-full flex flex-col">
          <label className="font-kanit font-semibold mt-2 text-gray-700">
            ชื่อผู้คำนวณ
          </label>
          <input
            type="text"
            placeholder="ชื่อผู้คำนวณ"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-200 rounded-sm p-2 shadow-sm mt-2"
          />

          <label className="font-kanit font-semibold mt-2 text-gray-700">
            ราคารถ (บาท)
          </label>
          <input
            type="number"
            placeholder="ราคารถ (บาท)"
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value)}
            className="border border-gray-200 rounded-sm p-2 shadow-sm mt-2"
          />

          <label className="font-kanit font-semibold mt-2 text-gray-700">
            ดอกเบี้ยต่อปี (%)
          </label>
          <input
            type="number"
            placeholder="ดอกเบี้ยต่อปี (%)"
            value={interestPct}
            onChange={(e) => setInterestPct(e.target.value)}
            className="border border-gray-200 rounded-sm p-2 shadow-sm mt-2"
          />

          <p className="font-semibold font-kanit text-gray-700 mt-4">เงินดาวน์ (%) </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center">
              <input className="w-5 h-5 border-none ring-2 ring-white  mt-2"
                type="radio"
                name="downPct"
                value="15"
                checked={downPct === "15"}
                onChange={(e) => setDownPct(e.target.value)}
              />
              <label className="ml-2 mt-2 font-semibold font-kanit text-gray-700" for="radio-metric">15%</label>
            </div>
            <div className="flex items-center">
              <input className="w-5 h-5 border-none ring-2 ring-white  mt-2"
                type="radio"
                name="downPct"
                value="20"
                checked={downPct === "20"}
                onChange={(e) => setDownPct(e.target.value)}
              />
              <label className="ml-2 mt-2 font-semibold font-kanit text-gray-700" for="radio-metric">20%</label>
            </div>
            <div className="flex items-center">
              <input className="w-5 h-5 border-none ring-2 ring-white  mt-2"
                type="radio"
                name="downPct"
                value="25"
                checked={downPct === "25"}
                onChange={(e) => setDownPct(e.target.value)}
              />
              <label className="ml-2 mt-2 font-semibold font-kanit text-gray-700" for="radio-metric">25%</label>
            </div>
            <div className="flex items-center">
              <input className="w-5 h-5 border-none ring-2 ring-white  mt-2"
                type="radio"
                name="downPct"
                value="30"
                checked={downPct === "30"}
                onChange={(e) => setDownPct(e.target.value)}
              />
              <label className="ml-2 mt-2 font-semibold font-kanit text-gray-700" for="radio-metric">30 %</label>
            </div>
            <div className="flex items-center">
              <input className="w-5 h-5 border-none ring-2 ring-white  mt-2"
                type="radio"
                name="downPct"
                value="35"
                checked={downPct === "35"}
                onChange={(e) => setDownPct(e.target.value)}
              />
              <label className="ml-2 mt-2 font-semibold font-kanit text-gray-700" for="radio-metric">35%</label>
            </div>
          </div>

          <div class="w-full flex flex-col text-sm">
            <label for="" className="font-semibold font-kanit text-gray-700 mt-4 text-lg">จำนวณเดือนที่ผ่อน</label>
            <select name="months"
              id="months-select"
              value={months}
              onChange={(e) => setMonths(e.target.value)} className=" font-kanit text-gray-700 text-lg border border-gray-200 rounded-sm p-2 shadow-sm mt-2">
              <option value="24">24 เดือน</option>
              <option value="36">36 เดือน</option>
              <option value="48">48 เดือน</option>
              <option value="60">60 เดือน</option>
              <option value="72">72 เดือน</option>
              <option value="84">84 เดือน</option>
            </select>
          </div>
          <div className="flex justify-center gap-10 ">
            <button onClick={handleCalCarClick}
              type="button" className="w-full bg-lime-700 text-white p-2 mt-5 rounded-sm font-kanit font-semibold hover:bg-lime-800 cursor-pointer shadow-sm">
              คำนวณ
            </button>

            <button onClick={handleResetClick}
              type="button" className="w-full bg-gray-300 text-gray-700 p-2 mt-5 rounded-sm font-kanit font-semibold hover:bg-gray-400 cursor-pointer shadow-sm">
              ล้างข้อมูล
            </button>
          </div>

        </form>

        {/* ส่วนแสดงผล */}
        <div className="flex items-center justify-center mt-5 gap-5">
          <p className="font-kanit font-semibold mt-5">ผ่อนชำระต่อเดือน</p>
          <p className="font-kanit font-semibold mt-5">{monthlyPay} บาท</p>
        </div>
        {/* กลับหน้า */}
        <Link to="/" className="w-full text-center bg-gray-300 text-gray-700 p-2 mt-4 rounded-sm font-kanit font-semibold shadow-sm">
          กลับหน้าหลัก
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <Footer />
      </div>
    </>
  );
}