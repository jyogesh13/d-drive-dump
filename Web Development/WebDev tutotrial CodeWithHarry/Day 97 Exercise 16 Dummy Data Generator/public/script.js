let generate_btn = document.getElementById('generate-btn');
let delete_btn = document.getElementById('delete-btn');
let display = document.querySelector('.display');


async function generateData() {
    await fetch('/generate', {method: "POST"});
    fetchData();
}

async function fetchData(){
    const response = await fetch('/employees')
    const result= await response.json()
    console.log(result);
    
    showData(result);
}

function showData(result) {
    let data = result["data"]
    data.forEach(element => {
        display.innerHTML += `
        <p>
            name: ${element.name},
            salary: ${element.salary},
            language: ${element.language},
            city: ${element.city},
            isManager: ${element.isManager}
        </p>
        `
    });
}

async function deleteData(){
    let response = await fetch('/delete',{method:"POST"})
    let result = await response.json()
    console.log(result);
    
    display.innerHTML = `
        <p>
            ${result['data']}
        </p>
        `
}

generate_btn.addEventListener('click',()=>{
    generateData();
})
delete_btn.addEventListener('click',()=>{
    deleteData();
})