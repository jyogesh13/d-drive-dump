export const downloadImage = async (url: string, id: number | 0) => {
    if (!url) return;
    try {

        const proxyUrl = `https://avatar-proxy-server.onrender.com/proxy?url=${encodeURIComponent(url)}`;

        const res = await fetch(proxyUrl);
        const blob = await res.blob();

        const blobUrl = window.URL.createObjectURL(blob)

        const contentType = res.headers.get("Content-Type");
        const extension = contentType?.split("/")[1] || (url.includes("svg") ? "svg" : "jpg");
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${id}-${Date.now()}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
        console.log("Download Failed: ", error)
    }
}