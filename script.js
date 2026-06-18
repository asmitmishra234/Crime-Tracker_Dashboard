let editId=null
let crimes = JSON.parse(localStorage.getItem('crimes'))||[
  {
    id: 1,
    name: "Rahul Sharma",
    crime: "Cyber Crime",
    city: "Kanpur",
    status: "Pending"
  },

  {
    id: 2,
    name: "Aman Verma",
    crime: "Theft",
    city: "Lucknow",
    status: "Solved"
  },

  {
    id: 3,
    name: "Rohit Singh",
    crime: "Fraud",
    city: "Delhi",
    status: "Pending"
  }
];
  
function saveToLocalStorage() {
  localStorage.setItem("crimes", JSON.stringify(crimes));
}
let container=document.querySelector("#crime-container")

function displayData(data){
    container.innerHTML=""
    data.forEach((e)=>{
        let card=document.createElement('div')
        card.className="crime-card"
        card.innerHTML=`
        <h3>${e.name}</h3>
        <p><span>Crime:</span>${e.crime}</p>
         <p><span>City:</span>${e.city}</p>
          <p><span>Status:</span>${e.status}</p>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn"> Delete</button>  
          
        `

        container.append(card)
           let deleteBtn=card.querySelector('.delete-btn')
        deleteBtn.addEventListener("click",()=>{
            crimes = crimes.filter(items => items.id !== e.id)
            saveToLocalStorage()
            displayData(crimes)
             updateStats()
             updateChart()
             updateDangerousCity()
            
           
        
        })
                  let editButton=card.querySelector(".edit-btn")
          editButton.addEventListener("click",()=>{
            console.log('clicked')
            editId=e.id
            document.getElementById("name").value=e.name
            document.getElementById("crime").value=e.crime
            document.getElementById("city").value=e.city
            document.getElementById("status").value=e.status
            
          })
      
             
    })
    
}
displayData(crimes) 
 let addbtn=document.getElementById("add-report")
        addbtn.addEventListener("click",()=>{
          let name=document.getElementById("name").value
          let crime=document.getElementById("crime").value
          let city=document.getElementById("city").value
          let status=document.getElementById("status").value
          if(editId){
                    crimes=crimes.map((items)=>{
            if(items.id===editId){
              return{
                ...items,
                name,
                crime,
                city,
                status
              }
            }
            return items
          })
          editId=null
          }else{

          
          let newCrime={
            id:Date.now(),
            name,
            crime,
            city,
            status
          }
            
      
                    crimes.push(newCrime)
                  
        }
        saveToLocalStorage()
              displayData(crimes)
              updateStats()
              updateChart()
             updateDangerousCity()
      
              })
              let searchInput = document.querySelector(".search");

searchInput.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();

  let filtered = crimes.filter((item) => {
    return (
      item.name.toLowerCase().includes(value) ||
      item.city.toLowerCase().includes(value) ||
      item.crime.toLowerCase().includes(value)
    );
  });

  displayData(filtered);
});
let statusFilter = document.getElementById("crimefilter");

statusFilter.addEventListener("change", (e) => {
  let value = e.target.value;

  if (value === "all") {
    displayData(crimes);
    return;
  }

  let filtered = crimes.filter((item) => {
    return item.status.toLowerCase() === value.toLowerCase();
  });

  displayData(filtered);
});
function updateStats() {
  document.getElementById("totalCases").textContent = crimes.length;

  let pending = crimes.filter(
    item => item.status.toLowerCase() === "pending"
  ).length;

  let solved = crimes.filter(
    item => item.status.toLowerCase() === "solved"
  ).length;

  document.getElementById("pendingCases").textContent = pending;
  document.getElementById("solvedCases").textContent = solved;
}
displayData(crimes)
updateStats()
updateDangerousCity()
function updateDangerousCity() {
  let cityCount = {};

  crimes.forEach((item) => {
    cityCount[item.city] = (cityCount[item.city] || 0) + 1;
  });

  let maxCity = "";
  let maxCount = 0;

  for (let city in cityCount) {
    if (cityCount[city] > maxCount) {
      maxCount = cityCount[city];
      maxCity = city;
    }
  }

  document.getElementById("dangerousCity").textContent = maxCity;
}
displayData(crimes)
updateStats()
updateDangerousCity()
function updateChart() {
  let pending = crimes.filter(
    item => item.status.toLowerCase() === "pending"
  ).length;

  let solved = crimes.filter(
    item => item.status.toLowerCase() === "solved"
  ).length;

  const ctx = document.getElementById("crimeChart");

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Solved"],
      datasets: [{
        data: [pending, solved]
      }]
    }
  });
}
displayData(crimes)
updateStats()
updateChart()