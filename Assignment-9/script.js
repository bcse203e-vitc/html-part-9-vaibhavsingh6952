
function openBookingForm(service) {
    document.getElementById('service').value = service;
    document.getElementById('booking-modal').style.display = 'flex';
  }
  
  function closeBookingForm() {
    document.getElementById('booking-modal').style.display = 'none';
  }

  document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let datetime = document.getElementById('datetime').value;
    let service = document.getElementById('service').value;
    let terms = document.getElementById('terms').checked;
    
    if (!name || !email || !phone.match(/^\d{10}$/) || !datetime || new Date(datetime) <= new Date() || !terms) {
      alert('Please fill all fields correctly.');
      return;
    }

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let appointment = {
      name,
      service,
      datetime,
      status: 'Pending'
    };
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    updateAppointmentsList();
  
    document.getElementById('confirmation-message').innerText = `Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.`;
    document.getElementById('confirmation-popup').style.display = 'flex';
  
    closeBookingForm();
  });
  

  function closeConfirmationPopup() {
    document.getElementById('confirmation-popup').style.display = 'none';
  }
  
  function updateAppointmentsList() {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Service</th>
        <th>Date & Time</th>
        <th>Status</th>
      </tr>
    `;
    
    appointments.forEach(app => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${app.name}</td>
        <td>${app.service}</td>
        <td>${app.datetime}</td>
        <td>${app.status}</td>
      `;
      appointmentsList.appendChild(row);
    });
  }
  
  document.addEventListener('DOMContentLoaded', updateAppointmentsList);
  