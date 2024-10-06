const token = "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";
const inputText = document.getElementById('input');
const image = document.getElementById('image');
const button = document.getElementById('btn');
const loading = document.getElementById('loading');

async function query() {
    loading.style.display = "block";  // Show loading text
    image.style.display = "none";     // Hide image while loading

    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({"inputs": inputText.value}),
        }
    );
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () {
    query().then((response) => {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        image.style.display = "block";  // Show image after loading
        loading.style.display = "none"; // Hide loading text
    });
});
