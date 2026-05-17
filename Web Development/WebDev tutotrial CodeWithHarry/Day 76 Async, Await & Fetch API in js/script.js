async function getdata(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function main(){
    let url = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
    console.log("Starting......");
    let questions = await getdata(url);
    
    console.log(questions["results"][0]["incorrect_answers"]);
    
    // console.log(questions);
    console.log("End......");
}
main();