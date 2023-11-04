// const fileInput = document.getElementById('audioFile');
// const fileNameDisplay = document.getElementById('file-name');
// const uploadButton = document.getElementById('upload-button');
// const predict = document.getElementById('predict');
// fileInput.addEventListener('change', () => {
//     if (fileInput.files.length > 0) {
//         const fileName = fileInput.files[0].name;
//         fileNameDisplay.textContent = 'ไฟล์ที่เลือก: ' + fileName;
//     } else {
//         fileNameDisplay.textContent = '';
//     }
// });


// uploadButton.addEventListener('click', () => {
//     const formData = new FormData();
//     formData.append('audio_file', fileInput.files[0]);
//     fetch('http://localhost:5000/Container2Perdiction/upload', {
//         method: 'POST',
//         body: formData,
//     })
//     .then(response => {
//         if (response.ok) {
//             // คำร้องขอสำเร็จ
//             console.log('ไฟล์เสียงถูกอัพโหลดเรียบร้อย');
//             return response.json(); // Parse the response JSON
//         } else {
//             // คำร้องขอไม่สำเร็จ
//             console.error('เกิดข้อผิดพลาดในการอัพโหลดไฟล์เสียง');
//             throw new Error('ไม่สามารถอัพโหลดไฟล์เสียง');
//         }
//     })
//     .then(data => {
//         // เรียก API จาก Container 2 เพื่อรับคำตอบ
//         console.log(data.predict);
//         predict.textContent = 'ผลลัพธ์: ' + data.predict;
//     })
//     .catch(error => {
//         console.error('เกิดข้อผิดพลาดในการรับข้อมูลจาก Container 2', error);
//     });
// });


// // uploadButton.addEventListener('click', () => {
// //     const formData = new FormData();
// //     formData.append('audio_file', fileInput.files[0]);
// //     fetch('http://localhost:5000/Container2Perdiction/upload', {
// //         method: 'POST',
// //         body: formData,
// //     })
// //     .then(response => {
// //         if (response.ok) {
// //             // คำร้องขอสำเร็จ
// //             console.log('ไฟล์เสียงถูกอัพโหลดเรียบร้อย');
// //         } else {
// //             // คำร้องขอไม่สำเร็จ
// //             console.error('เกิดข้อผิดพลาดในการอัพโหลดไฟล์เสียง');
// //         }
// //     })
// // });
const fileInput = document.getElementById('audioFile');
const fileNameDisplay = document.getElementById('file-name');
const uploadButton = document.getElementById('upload-button');
const resultContainer = document.getElementById('result-container');
// const audioPlayer = document.getElementById('audio-player');
// const audioPlayer = new Audio();
const audioPlayer = document.getElementById('audio-player');

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileNameDisplay.textContent = 'name: ' + fileName;
        audioPlayer.src = URL.createObjectURL(fileInput.files[0]); // กำหนด URL ให้กับ <audio> element
        audioPlayer.style.display = 'block'; // แสดงตัวเล่นเสียง
    } else {
        fileNameDisplay.textContent = '';
        audioPlayer.style.display = 'none';
    }
});

uploadButton.addEventListener('click', () => {
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('audio_file', fileInput.files[0]);
        fetch('http://localhost:5000/Container2Perdiction/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response JSON
            } else {
                console.error('เกิดข้อผิดพลาดในการอัพโหลดไฟล์เสียง');
                throw new Error('ไม่สามารถอัพโหลดไฟล์เสียง');
            }
        })
        .then(data => {
            console.log(data.predict);
            resultContainer.textContent =  data.predict;
      
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการรับข้อมูลจาก Container 2', error);
        });
    }
});

// function playAudio(file) {
//     const objectURL = URL.createObjectURL(file); // สร้าง URL จากไฟล์เสียงที่เลือก
//     audioPlayer.src = objectURL; // กำหนด URL ให้กับ <audio> element
//     audioPlayer.style.display = 'block'; // แสดงตัวเล่นเสียง
//     audioPlayer.play(); // เริ่มเล่นไฟล์เสียง
// }
