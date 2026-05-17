let text_area = document.getElementsByClassName("container")[0]

function delay(){
    let delay_time = Math.floor(Math.random() * 7) + 1;
    return delay_time;
}   

function print(msg,id){
    let html = `
        <div class="text">
            <p>${msg}</p>
            <div class="loader" id=${id}>
            </div>
        </div>
    `;
    text_area.innerHTML += html;
}

async function terminal_popup(msg,id){
    print(msg,id);      
    await new Promise(resolve=>setTimeout(resolve,delay()*1000));
    document.getElementById(id).classList.remove("loader");
}

async function main() {
    await terminal_popup('Initializing Hack',"msg1");    
    await terminal_popup('Reading your Files',"msg2");
    await terminal_popup('Password files Detected',"msg3");
    await terminal_popup('Sending all passwords and personal files to server',"msg4");
    await terminal_popup('Cleaning up',"msg5");
}

main();