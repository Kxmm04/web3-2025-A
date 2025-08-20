// ฟังก์ชันคำนวณ (return ค่า)
function calculateResult(num1, op, num2, num3) {
    let result;
    switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num2 !== 0 ? num1 / num2 : NaN; break;
    }
    return result + num3;
}

$(document).ready(function () {
    // เปิด modal
    $("#openModal").click(function () {
        $("#myModal").fadeIn();
    });

    // ปิด modal
    $("#closeModal").click(function () {
        $("#myModal").fadeOut();

        // ปิด modal
        $("#closeModal").click(function () {
            $("#myModal").fadeOut();

            // ลบข้อมูลที่เคยกรอกไว้
            $("#input1").val(null);
            $("#input2").val(null);
            $("#input3").val(null);
            $("#dateInput").val(null);
            $("#operator").val("เลือกตัวดำเนินการ");
        });
    });

    // ปุ่มคำนวณ
    $("#calculate").click(function () {
        let num1 = parseFloat($("#input1").val());
        let op = $("#operator").val();
        let num2 = parseFloat($("#input2").val());
        let num3 = parseFloat($("#input3").val());
        let dateInput = $("#dateInput").val();

        // ตรวจสอบวันปัจจุบัน
        let today = new Date().toISOString().split('T')[0];
        if (dateInput !== today) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "วันที่ไม่ตรงกับวันปัจจุบัน!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            return;
        }

        // ตรวจสอบค่าที่กรอก
        if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "กรุณากรอกข้อมูลให้ครบทุกช่อง!",
            });
            return;
        }

        // คำนวณผลลัพธ์
        let result = calculateResult(num1, op, num2, num3);
        if (isNaN(result)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ไม่สามารถหารด้วยศูนย์ได้!",
            });
            return;
        }

        // แสดงผลลัพธ์ในตาราง
        let equation = `${num1}+${num2}+${num3}`;
        let row = `
            <tr>
              <td>${num1}</td>
              <td>${num2}</td>
              <td>${num3}</td>
              <td>${equation}</td>
              <td class="${result < 0 ? 'result-negative' : ''}">${result}</td>
            </tr>
        `;
        $("#resultTable tbody").append(row);

        // เก็บผลลัพธ์ใน Local Storage
        let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
        history.push({ num1, op, num2, num3, equation, result });
        localStorage.setItem("calcHistory", JSON.stringify(history));

        // ปิด modal
        $("#myModal").fadeOut();

        $("#input1").val(null);
        $("#input2").val(null);
        $("#input3").val(null);
        $("#dateInput").val(null);
        $("#operator").val("+");
    });

    // โหลดข้อมูลจาก Local Storage กลับมาแสดง
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history.forEach(item => {
        let row = `
            <tr>
              <td>${item.num1}</td>
              <td>${item.op}</td>
              <td>${item.num2}</td>
              <td>${item.num3}</td>
              <td>${item.equation}</td>
              <td class="${item.result < 0 ? 'result-negative' : ''}">${item.result}</td>
            </tr>
        `;
        $("#resultTable tbody").append(row);
    });
});

$("#clearHistory").click(function () {
    localStorage.removeItem("calcHistory");
    $("#resultTable tbody").empty();
});