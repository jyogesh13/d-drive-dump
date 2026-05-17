export default async function Page({ params }) {
    // throw new Error("Error hai");
  //   const { slug } = await params
  //fetch your blog post by its slug
    let languages = ["python","java","C++","C#"]
    if(languages.includes(params.slug)){
        return <div>My Post: {params.slug}</div>
    }
    else{
        return <div>Page Not found</div>
    }
//   return <div>My Post: {params.slug}</div>;
}
