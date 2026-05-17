export default async function Page({ params }) {
    let {val} = await params
    console.log(val);
    console.log(val[0]);
    console.log(val[1]);
    console.log(val[2]);
    
    return <div>I am about page, check console</div>;
}