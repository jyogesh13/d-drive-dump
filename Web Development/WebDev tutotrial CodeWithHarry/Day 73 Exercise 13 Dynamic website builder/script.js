function createCard(title, cName, views, monthsOld, duration, thumbnail) {
    // Finish this function
    let format_views = formated_views(views);
    let html = `
        <div class="container">
            <div class="img-container">
                <img src="${thumbnail}" alt="">
                <p class="timer">${duration}
                </p>
            </div>
            <div class="content"> 
                <div class="title">${title}</div>
                <div class="info">
                    <span>${cName} . ${format_views} views . ${monthsOld} months ago</span>
                </div>
            </div>
        </div>`;
    
    document.querySelector('.outer-box').innerHTML += html;
}

function formated_views(views){
    if(views.toString().length >= 6){
        return (Math.round(views/Math.pow(10,6)) + "M")
    }
    else if(views.toString().length >= 3){
        return (Math.round(views/Math.pow(10,3)) + "K")
    }
}

createCard(
    "Introduction to Backend | Sigma Web Dev video #2",
    "CodeWithHarry",
    5456453,
    7,
    "31:22",
    "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw"
);
document.querySelector('.btn').addEventListener('click',()=>{

    createCard(
        "Introduction to Backend | Sigma Web Dev video #2",
        "CodeWithHarry",
        5456453,
        7,
        "31:22",
        "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw"
    );
})
