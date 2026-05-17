export const downloadAvatar = async (url: string, name: string | "avatar") => {
    if (!url) return;
    try {

        const proxyUrl = `https://avatar-proxy-server.onrender.com/proxy?url=${encodeURIComponent(url)}`;

        const res = await fetch(proxyUrl);
        const blob = await res.blob();

        const blobUrl = window.URL.createObjectURL(blob)

        const a = document.createElement('a');
        a.href = blobUrl;
        const extension = url.includes("svg") ? "svg" : "jpg"
        a.download = `${name}-${Date.now()}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
        console.log("Download Failed: ", error)
    }
}