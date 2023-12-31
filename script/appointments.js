const appointment_header = document.getElementById("appointment_header");
const main_container = document.getElementById("main_container");

getAppointmentsFn();


let userRole="";
async function getAppointmentsFn() {
    try {
        let res = await fetch("https://health-care-system-backend.onrender.com/appointments", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                authorization: sessionStorage.getItem("health_token")
            }
        })
        let fin = await res.json();
        if (res.status == 200) {
            userRole=fin.userRole;
            renderAppointmentsFn(fin.data, fin.userRole);
        } else {
            alert(fin.msg);
            window.location.href = "../html/login.html";
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to get Appointments");
    }
}


function renderAppointmentsFn(arr, role) {
    appointment_header.innerText = null;
    appointment_header.innerText = `Hello ${role}, Here's your appointments`;
    main_container.innerHTML = null;
    let template_arr = arr.map((el) => {
        return `<div class="appointment_box">
        <div class="doctor_name"><label for="">Doctor Name :</label>${el.doctor_id.name}</div>
        <div class="specialization"><label for="">Specialization :</label>${el.doctor_id.doctor_specialization}</div>
        <div class="doctor_email"><label for="">Doctor Email :</label>${el.doctor_id.email}</div>
        <div class="patient_name"><label for="">Patient Name :</label>${el.patient_id.name}</div>
        <div class="date"><label for="">Date :</label>${el.date}</div>
        <div class="time_slot"><label for="">Time Slot :</label>${el.time_slot}</div>
        <div class="patient_email"><label for="">Patient Email :</label>${el.patient_id.email}</div>
        <div class="btns_div">
            <button type="click" class="video_btn" data-id=${el._id}>Video Consultation</button>
            <button type="click" class="delete_btn" data-id=${el._id}>Cancel Appointment</button>
        </div>
    </div>`;
    })
    main_container.innerHTML = template_arr.join("");

    const all_delete_btns = document.querySelectorAll(".delete_btn");
    for (let delete_btn of all_delete_btns) {
        delete_btn.addEventListener("click", (event) => {
            event.preventDefault();
            const delete_id = event.target.dataset.id;
            deleteAppointmentFn(delete_id);
        })
    }


    const all_video_btns = document.querySelectorAll(".video_btn");
    for (let video_btn of all_video_btns) {
        video_btn.addEventListener("click", (event) => {
            event.preventDefault();
            const appointmentId = event.target.dataset.id;
            initiateVideoConsultationFn(appointmentId);
        })
    }


}


async function deleteAppointmentFn(delete_id) {
    try {
        let res = await fetch(`https://health-care-system-backend.onrender.com/appointment/${delete_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                authorization: sessionStorage.getItem("health_token")
            }
        })
        let fin = await res.json();
        if (res.status == 200) {
            alert(fin.msg);
            window.location.href = "../html/appointments.html";
        } else {
            alert(fin.msg);
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to delete the Appointment");
    }
}





async function initiateVideoConsultationFn(appointmentId) {
    try {
        let str=`https://health-care-system-backend.onrender.com/${appointmentId}`;
        window.open(str, "_blank");
    } catch (error) {
        console.log(error.message);
        alert("Unable to initiate video consultation");
    }
}



